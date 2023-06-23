import {JokesModels} from '../../../../src/scenes/jokes/JokesModels';
import {JokesDisplayLogic} from '../../../../src/scenes/jokes/JokesScene';
import 'react-native';

export class JokesDisplayLogicSpy implements JokesDisplayLogic {
  displayLoadingStateCalled: boolean = false;
  displayNotLoadingStateCalled: boolean = false;

  displayItemsCalled: boolean = false;
  displayNoMoreItemsCalled: boolean = false;
  displayRemoveNoMoreItemsCalled: boolean = false;

  displayErrorCalled: boolean = false;
  displayRemoveErrorCalled: boolean = false;

  displayReadStateCalled: boolean = false;
  displayScrollToItemCalled: boolean = false;

  displayLoadingState(): void {
    this.displayLoadingStateCalled = true;
  }

  displayNotLoadingState(): void {
    this.displayNotLoadingStateCalled = true;
  }

  displayItems(_viewModel: JokesModels.ItemsPresentation.ViewModel): void {
    this.displayItemsCalled = true;
  }

  displayNoMoreItems(_viewModel: JokesModels.NoMoreItemsPresentation.ViewModel): void {
    this.displayNoMoreItemsCalled = true;
  }

  displayRemoveNoMoreItems(): void {
    this.displayRemoveNoMoreItemsCalled = true;
  }

  displayError(_viewModel: JokesModels.ErrorPresentation.ViewModel): void {
    this.displayErrorCalled = true;
  }

  displayRemoveError(): void {
    this.displayRemoveErrorCalled = true;
  }

  displayReadState(_viewModel: JokesModels.ItemReadState.ViewModel): void {
    this.displayReadStateCalled = true;
  }

  displayScrollToItem(_viewModel: JokesModels.ItemScroll.ViewModel): void {
    this.displayScrollToItemCalled = true;
  }
}

it('test', () => {
  expect(true).toBeTruthy();
});
