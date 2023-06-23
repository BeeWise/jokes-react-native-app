import 'react-native';
import {JokeTask, JokeTaskModels} from '../../../src/tasks/joke/JokeTask';
import {Result} from '../../../src/operations/base/operations/Operation';
import {Joke} from '../../../src/models/joke/Joke';
import {OperationError} from '../../../src/operations/base/errors/OperationError';
import {TaskEnvironment} from '../../../src/tasks/environment/TaskEnvironment';

export class JokesTaskSpy extends JokeTask {
  fetchedJokes: Joke[] = [];
  fetchJokesCalled: boolean = false;
  shouldFailFetchJokes: boolean = false;

  constructor() {
    super(TaskEnvironment.memory);
  }

  fetchJokes(model: JokeTaskModels.FetchJokes.Request, completionHandler: Result<JokeTaskModels.FetchJokes.Response>): void {
    this.fetchJokesCalled = true;

    if (this.shouldFailFetchJokes) {
      completionHandler.failure(OperationError.noDataAvailable);
    } else {
      completionHandler.success(new JokeTaskModels.FetchJokes.Response(this.fetchedJokes));
    }
  }
}

it('test', () => {
  expect(true).toBeTruthy();
});
