import 'react-native';
import {JokesWorker} from '../../../src/scenes/jokes/JokesWorker';
import {JokesWorkerDelegateSpy} from './test_doubles/JokesWorkerDelegateSpy';
import {JokesTaskSpy} from '../../tasks/spies/JokeTaskSpy';

describe('JokesWorkerTests', () => {
  var sut: JokesWorker;
  var delegateSpy: JokesWorkerDelegateSpy;

  beforeAll(() => {
    delegateSpy = new JokesWorkerDelegateSpy();
    sut = new JokesWorker(delegateSpy);
  });

  it('testFetchJokesShouldAskTheJokeTaskToFetchJokes', () => {
    let taskSpy = new JokesTaskSpy();
    sut.jokeTask = taskSpy;
    sut.fetchJokes(1, 10, 0);
    expect(taskSpy.fetchJokesCalled).toBeTruthy();
  });

  it('testFetchJokesShouldAskTheDelegateToSendJokesForSuccessCase', () => {
    let taskSpy = new JokesTaskSpy();
    taskSpy.shouldFailFetchJokes = false;
    sut.jokeTask = taskSpy;
    sut.fetchJokes(1, 10, 0);
    expect(delegateSpy.successDidFetchJokesCalled).toBeTruthy();
  });

  it('testFetchJokesShouldAskTheDelegateToSendErrorForFailureCase', () => {
    let taskSpy = new JokesTaskSpy();
    taskSpy.shouldFailFetchJokes = true;
    sut.jokeTask = taskSpy;
    sut.fetchJokes(1, 10, 0);
    expect(delegateSpy.failureDidFetchJokesCalled).toBeTruthy();
  });
});
