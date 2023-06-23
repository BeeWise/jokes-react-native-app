import {Joke} from '../../../../src/models/joke/Joke';
import {OperationError} from '../../../../src/operations/base/errors/OperationError';
import {JokesWorkerDelegate} from '../../../../src/scenes/jokes/JokesWorker';
import 'react-native';

export class JokesWorkerDelegateSpy implements JokesWorkerDelegate {
  successDidFetchJokesCalled: boolean = false;
  failureDidFetchJokesCalled: boolean = false;

  successDidFetchJokes(_jokes: Joke[]): void {
    this.successDidFetchJokesCalled = true;
  }

  failureDidFetchJokes(_error: OperationError): void {
    this.failureDidFetchJokesCalled = true;
  }
}

it('test', () => {
  expect(true).toBeTruthy();
});
