import {JokesModels} from '../../../../src/scenes/jokes/JokesModels';
import {JokesPresentationLogic} from '../../../../src/scenes/jokes/JokesPresenter';
import 'react-native';

export class JokesPresentationLogicSpy implements JokesPresentationLogic {
  presentLoadingStateCalled: boolean = false;
  presentNotLoadingStateCalled: boolean = false;

  presentItemsCalled: boolean = false;

  presentNoMoreItemsCalled: boolean = false;
  presentRemoveNoMoreItemsCalled: boolean = false;

  presentErrorCalled: boolean = false;
  presentRemoveErrorCalled: boolean = false;

  presentReadStateCalled: boolean = false;

  presentScrollToItemCalled: boolean = false;

  presentLoadingState(): void {
    this.presentLoadingStateCalled = true;
  }

  presentNotLoadingState(): void {
    this.presentNotLoadingStateCalled = true;
  }

  presentItems(_response: JokesModels.ItemsPresentation.Response): void {
    this.presentItemsCalled = true;
  }

  presentNoMoreItems(): void {
    this.presentNoMoreItemsCalled = true;
  }

  presentRemoveNoMoreItems(): void {
    this.presentRemoveNoMoreItemsCalled = true;
  }

  presentError(_response: JokesModels.ErrorPresentation.Response): void {
    this.presentErrorCalled = true;
  }

  presentRemoveError(): void {
    this.presentRemoveErrorCalled = true;
  }

  presentReadState(_response: JokesModels.ItemReadState.Response): void {
    this.presentReadStateCalled = true;
  }

  presentScrollToItem(_response: JokesModels.ItemScroll.Response): void {
    this.presentScrollToItemCalled = true;
  }
}

it('test', () => {
  expect(true).toBeTruthy();
});
