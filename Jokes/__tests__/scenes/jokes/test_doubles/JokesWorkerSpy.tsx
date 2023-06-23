import {JokesWorker} from '../../../../src/scenes/jokes/JokesWorker';
import 'react-native';

export class JokesWorkerSpy extends JokesWorker {
  fetchJokesCalled: boolean = false;

  fetchJokes(_page: number, _limit: number, _orderBy: number): void {
    this.fetchJokesCalled = true;
  }
}

it('test', () => {
  expect(true).toBeTruthy();
});
