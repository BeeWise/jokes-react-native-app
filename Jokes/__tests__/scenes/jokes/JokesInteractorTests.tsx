import 'react-native';
import {JokesInteractor} from '../../../src/scenes/jokes/JokesInteractor';
import {JokesPresentationLogicSpy} from './test_doubles/JokesPresentationLogicSpy';
import {JokesWorkerSpy} from './test_doubles/JokesWorkerSpy';
import {Joke} from '../../../src/models/joke/Joke';
import {JokesModels} from '../../../src/scenes/jokes/JokesModels';

describe('JokesInteractorTests', () => {
  var sut: JokesInteractor;
  var presenterSpy: JokesPresentationLogicSpy;
  var workerSpy: JokesWorkerSpy;

  beforeAll(() => {
    sut = new JokesInteractor();
    presenterSpy = new JokesPresentationLogicSpy();
    sut.presenter = presenterSpy;
    workerSpy = new JokesWorkerSpy(sut);
    sut.worker = workerSpy;
  });

  it('testShouldFetchJokesShouldSetIsFetchingItemsToTrueForPaginationModel', () => {
    sut.paginationModel.isFetchingItems = false;
    sut.paginationModel.noMoreItems = false;
    sut.shouldFetchJokes();
    expect(sut.paginationModel.isFetchingItems).toBeTruthy();
  });

  it('testShouldFetchJokesShouldAskThePresenterToPresentLoadingStateWhenItIsNotFetchingItemsAndThereAreMoreItems', () => {
    sut.paginationModel.isFetchingItems = false;
    sut.paginationModel.noMoreItems = false;
    sut.shouldFetchJokes();
    expect(presenterSpy.presentLoadingStateCalled).toBeTruthy();
  });

  it('testShouldFetchJokesShouldAskTheWorkerToFetchJokesWhenItIsNotFetchingItemsAndThereAreMoreItems', () => {
    sut.paginationModel.isFetchingItems = false;
    sut.paginationModel.noMoreItems = false;
    sut.shouldFetchJokes();
    expect(workerSpy.fetchJokesCalled).toBeTruthy();
  });

  it('testSuccessDidFetchJokesShouldSetIsFetchingItemsToFalseForPaginationModel', () => {
    sut.paginationModel.isFetchingItems = true;
    sut.successDidFetchJokes([]);
    expect(sut.paginationModel.isFetchingItems).toBeFalsy();
  });

  it('testSuccessDidFetchJokesShouldUpdateJokesForPaginationModel', () => {
    let items = [new Joke(), new Joke(), new Joke()];
    let itemsLength = items.length;
    sut.paginationModel.items = items;

    let jokes = [new Joke(), new Joke(), new Joke()];
    let jokesLength = jokes.length;
    sut.successDidFetchJokes(jokes);
    expect(sut.paginationModel.items.length).toEqual(itemsLength + jokesLength);
  });

  it('testSuccessDidFetchJokesShouldIncrementCurrentPageForPaginationModel', () => {
    let currentPage = 0;
    sut.paginationModel.currentPage = currentPage;
    sut.successDidFetchJokes([]);
    expect(sut.paginationModel.currentPage).toEqual(currentPage + 1);
  });

  it('testSuccessDidFetchJokesShouldSetHasErrorToFalseForPaginationModel', () => {
    sut.paginationModel.hasError = true;
    sut.successDidFetchJokes([]);
    expect(sut.paginationModel.hasError).toBeFalsy();
  });

  it('testSuccessDidFetchJokesShouldAskThePresenterToPresentNotLoadingState', () => {
    sut.successDidFetchJokes([]);
    expect(presenterSpy.presentNotLoadingStateCalled).toBeTruthy();
  });

  it('testSuccessDidFetchJokesShouldAskThePresenterToPresentItems', () => {
    sut.successDidFetchJokes([]);
    expect(presenterSpy.presentItemsCalled).toBeTruthy();
  });

  it('testSuccessDidFetchJokesShouldAskThePresenterToPresentRemoveError', () => {
    sut.successDidFetchJokes([]);
    expect(presenterSpy.presentRemoveErrorCalled).toBeTruthy();
  });

  it('testSuccessDidFetchJokesShouldSetNoMoreItemsToTrueForPaginationModelWhenLimitReached', () => {
    sut.paginationModel.limit = 10;
    sut.paginationModel.noMoreItems = false;
    sut.successDidFetchJokes([]);
    expect(sut.paginationModel.noMoreItems).toBeTruthy();
  });

  it('testSuccessDidFetchJokesShouldAskThePresenterToPresentNoMoreItemsWhenLimitReached', () => {
    sut.paginationModel.limit = 10;
    sut.successDidFetchJokes([]);
    expect(presenterSpy.presentNoMoreItemsCalled).toBeTruthy();
  });

  it('testShouldRefreshDetailsShouldResetPaginationModel', () => {
    sut.paginationModel.isFetchingItems = true;
    sut.paginationModel.noMoreItems = true;
    sut.paginationModel.hasError = true;
    sut.paginationModel.currentPage = 10;
    sut.paginationModel.limit = 100;
    sut.paginationModel.items = [new Joke(), new Joke(), new Joke()];
    sut.paginationModel.readJokes = [new Joke(), new Joke()];

    sut.shouldRefreshDetails();
    expect(sut.paginationModel.noMoreItems).toBeFalsy();
    expect(sut.paginationModel.hasError).toBeFalsy();
    expect(sut.paginationModel.currentPage).toEqual(0);
    expect(sut.paginationModel.limit).toEqual(10);
    expect(sut.paginationModel.items.length).toEqual(0);
    expect(sut.paginationModel.readJokes.length).toEqual(0);
  });

  it('testShouldRefreshDetailsShouldAskThePresenterToPresentItems', () => {
    sut.shouldRefreshDetails();
    expect(presenterSpy.presentItemsCalled).toBeTruthy();
  });

  it('testShouldRefreshDetailsShouldAskThePresenterToPresentRemoveError', () => {
    sut.shouldRefreshDetails();
    expect(presenterSpy.presentRemoveErrorCalled).toBeTruthy();
  });

  it('testShouldRefreshDetailsShouldAskThePresenterToPresentRemoveNoMoreItems', () => {
    sut.shouldRefreshDetails();
    expect(presenterSpy.presentRemoveNoMoreItemsCalled).toBeTruthy();
  });

  it('testShouldRefreshDetailsShouldSetIsFetchingItemsToTrueForPaginationModel', () => {
    sut.paginationModel.isFetchingItems = false;
    sut.paginationModel.noMoreItems = false;
    sut.shouldRefreshDetails();
    expect(sut.paginationModel.isFetchingItems).toBeTruthy();
  });

  it('testShouldRefreshDetailsShouldAskThePresenterToPresentLoadingStateWhenItIsNotFetchingItemsAndThereAreMoreItems', () => {
    sut.paginationModel.isFetchingItems = false;
    sut.paginationModel.noMoreItems = false;
    sut.shouldRefreshDetails();
    expect(presenterSpy.presentLoadingStateCalled).toBeTruthy();
  });

  it('testShouldRefreshDetailsShouldAskTheWorkerToFetchJokesWhenItIsNotFetchingItemsAndThereAreMoreItems', () => {
    sut.paginationModel.isFetchingItems = false;
    sut.paginationModel.noMoreItems = false;
    sut.shouldRefreshDetails();
    expect(workerSpy.fetchJokesCalled).toBeTruthy();
  });

  it('testShouldSelectReadAnswerShouldUpdateReadJokesForPaginationModel', () => {
    let uuid = 'jokeId';
    let joke = new Joke();
    joke.uuid = uuid;
    let jokes = [joke];
    sut.paginationModel.items = jokes;
    sut.paginationModel.readJokes = [];

    sut.shouldSelectReadAnswer(new JokesModels.ItemSelection.Request(uuid));
    expect(sut.paginationModel.readJokes.length).toEqual(jokes.length);
  });

  it('testShouldSelectReadAnswerShouldAskThePresenterToPresentReadState', () => {
    let uuid = 'jokeId';
    let joke = new Joke();
    joke.uuid = uuid;
    sut.paginationModel.items = [joke];

    sut.shouldSelectReadAnswer(new JokesModels.ItemSelection.Request(uuid));
    expect(presenterSpy.presentReadStateCalled).toBeTruthy();
  });

  it('testShouldSelectLogoShouldAskThePresenterToPresentScrollToItem', () => {
    sut.shouldSelectLogo();
    expect(presenterSpy.presentScrollToItemCalled).toBeTruthy();
  });
});
