import {JokesBusinessLogic} from '../../../../src/scenes/jokes/JokesInteractor';
import 'react-native';
import {JokesModels} from '../../../../src/scenes/jokes/JokesModels';

export class JokesBusinessLogicSpy implements JokesBusinessLogic {
  shouldFetchJokesCalled: boolean = false;
  shouldRefreshDetailsCalled: boolean = false;
  shouldSelectLogoCalled: boolean = false;
  shouldSelectReadAnswerCalled: boolean = false;

  shouldFetchJokes(): void {
    this.shouldFetchJokesCalled = true;
  }

  shouldRefreshDetails(): void {
    this.shouldRefreshDetailsCalled = true;
  }

  shouldSelectLogo(): void {
    this.shouldSelectLogoCalled = true;
  }

  shouldSelectReadAnswer(_request: JokesModels.ItemSelection.Request): void {
    this.shouldSelectReadAnswerCalled = true;
  }
}

it('test', () => {
  expect(true).toBeTruthy();
});
