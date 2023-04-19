import {OperationError} from '../../operations/base/errors/OperationError';
import {JokesModels} from './JokesModels';
import {JokesPresentationLogic} from './JokesPresenter';
import {JokesWorker, JokesWorkerDelegate} from './JokesWorker';
import {Joke} from '../../models/joke/Joke';

export interface JokesBusinessLogic {
  shouldFetchJokes(): void;

  shouldRefreshDetails(): void;

  shouldSelectReadAnswer(request: JokesModels.ItemSelection.Request): void;

  shouldSelectLogo(): void;
}

export class JokesInteractor implements JokesBusinessLogic, JokesWorkerDelegate {
  presenter?: JokesPresentationLogic;
  worker?: JokesWorker;

  paginationModel: JokesModels.PaginationModel = new JokesModels.PaginationModel();

  constructor() {
    this.worker = new JokesWorker(this);
  }

  //#region Fetch jokes
  shouldFetchJokes(): void {
    if (!this.paginationModel.isFetchingItems && !this.paginationModel.noMoreItems) {
      this.paginationModel.isFetchingItems = true;
      this.presenter?.presentLoadingState();
      this.worker?.fetchJokes(this.paginationModel.currentPage, this.paginationModel.limit, Joke.OrderBy.latest.value);
    }
  }

  successDidFetchJokes(jokes: Joke[]): void {
    this.paginationModel.isFetchingItems = false;
    jokes.forEach(element => this.paginationModel.items.push(element));
    this.paginationModel.currentPage += 1;
    this.paginationModel.hasError = false;

    this.presenter?.presentNotLoadingState();
    this.presentItems();
    this.presenter?.presentRemoveError();

    this.shouldVerifyNoMoreItems(jokes.length);
  }

  failureDidFetchJokes(error: OperationError): void {
    this.paginationModel.isFetchingItems = false;
    this.paginationModel.hasError = true;
    this.presenter?.presentNotLoadingState();
    this.presenter?.presentError(new JokesModels.ErrorPresentation.Response(error));
  }
  //#endregion

  //#region Refresh details
  shouldRefreshDetails(): void {
    this.paginationModel.reset();

    this.presentItems();
    this.presenter?.presentRemoveError();
    this.presenter?.presentRemoveNoMoreItems();

    this.shouldFetchJokes();
  }
  //#endregion

  presentItems() {
    this.presenter?.presentItems(new JokesModels.ItemsPresentation.Response(this.itemsToPresent(), this.paginationModel.readJokes));
  }

  itemsToPresent(): Joke[] {
    return this.paginationModel.items;
  }

  shouldVerifyNoMoreItems(count: number) {
    if (count < this.paginationModel.limit) {
      this.paginationModel.noMoreItems = true;
      this.presenter?.presentNoMoreItems();
    }
  }

  joke(id?: string): Joke | undefined {
    if (id === undefined || id === null) {
      return undefined;
    }
    return this.paginationModel.items.find(element => element.uuid === id);
  }

  shouldSelectReadAnswer(request: JokesModels.ItemSelection.Request): void {
    let joke = this.joke(request.id);
    if (joke !== undefined) {
      this.paginationModel.readJokes.push(joke);
      this.presenter?.presentReadState(new JokesModels.ItemReadState.Response(true, joke.uuid));
    }
  }

  shouldSelectLogo(): void {
    this.presenter?.presentScrollToItem(new JokesModels.ItemScroll.Response(false, 0));
  }
}
