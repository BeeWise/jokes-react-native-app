import {OperationError} from '../../operations/base/errors/OperationError';
import {Joke} from '../../models/joke/Joke';
import {JokeTaskModels, JokeTaskProtocol} from '../../tasks/joke/JokeTask';
import {TaskConfigurator} from '../../tasks/configurator/TaskConfigurator';

export interface JokesWorkerDelegate {
  successDidFetchJokes(jokes: Joke[]): void;
  failureDidFetchJokes(error: OperationError): void;
}

export class JokesWorker {
  delegate?: JokesWorkerDelegate;

  jokeTask: JokeTaskProtocol = TaskConfigurator.instance.jokeTask();

  constructor(delegate?: JokesWorkerDelegate) {
    this.delegate = delegate;
  }

  fetchJokes(page: number, limit: number, orderBy: number) {
    let delegate = this.delegate;
    this.jokeTask.fetchJokes(new JokeTaskModels.FetchJokes.Request(page, limit, orderBy), {
      success(response?: JokeTaskModels.FetchJokes.Response) {
        delegate?.successDidFetchJokes(response?.jokes ?? []);
      },
      failure(error: OperationError) {
        delegate?.failureDidFetchJokes(error);
      },
    });
  }
}
