import 'react-native';
import {JokesPresenter} from '../../../src/scenes/jokes/JokesPresenter';
import {JokesDisplayLogicSpy} from './test_doubles/JokesDisplayLogicSpy';
import {JokesModels} from '../../../src/scenes/jokes/JokesModels';
import {OperationError} from '../../../src/operations/base/errors/OperationError';

describe('JokesPresenterTests', () => {
  var sut: JokesPresenter;
  var displaySpy: JokesDisplayLogicSpy;

  beforeAll(() => {
    sut = new JokesPresenter();
    displaySpy = new JokesDisplayLogicSpy();
    sut.displayer = displaySpy;
  });

  it('testPresentLoadingStateShouldAskTheDisplayerToDisplayLoadingState', () => {
    sut.presentLoadingState();
    expect(displaySpy.displayLoadingStateCalled).toBeTruthy();
  });

  it('testPresentNotLoadingStateShouldAskTheDisplayerToDisplayNotLoadingState', () => {
    sut.presentNotLoadingState();
    expect(displaySpy.displayNotLoadingStateCalled).toBeTruthy();
  });

  it('testPresentItemsShouldAskTheDisplayerToDisplayItems', () => {
    sut.presentItems(new JokesModels.ItemsPresentation.Response([], []));
    expect(displaySpy.displayItemsCalled).toBeTruthy();
  });

  it('testPresentNoMoreItemsShouldAskTheDisplayerToDisplayNoMoreItems', () => {
    sut.presentNoMoreItems();
    expect(displaySpy.displayNoMoreItemsCalled).toBeTruthy();
  });

  it('testPresentRemoveNoMoreItemsShouldAskTheDisplayerToDisplayRemoveNoMoreItems', () => {
    sut.presentRemoveNoMoreItems();
    expect(displaySpy.displayRemoveNoMoreItemsCalled).toBeTruthy();
  });

  it('testPresentErrorShouldAskTheDisplayerToDisplayError', () => {
    sut.presentError(new JokesModels.ErrorPresentation.Response(OperationError.noDataAvailable));
    expect(displaySpy.displayErrorCalled).toBeTruthy();
  });

  it('testPresentRemoveErrorShouldAskTheDisplayerToDisplayRemoveError', () => {
    sut.presentRemoveError();
    expect(displaySpy.displayRemoveErrorCalled).toBeTruthy();
  });

  it('testPresentReadStateShouldAskTheDisplayerToDisplayReadState', () => {
    sut.presentReadState(new JokesModels.ItemReadState.Response(true, 'id'));
    expect(displaySpy.displayReadStateCalled).toBeTruthy();
  });

  it('testPresentScrollToItemShouldAskTheDisplayerToDisplayScrollToItem', () => {
    sut.presentScrollToItem(new JokesModels.ItemScroll.Response(false, 0));
    expect(displaySpy.displayScrollToItemCalled).toBeTruthy();
  });
});
