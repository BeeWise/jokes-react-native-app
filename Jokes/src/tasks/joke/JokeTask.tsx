import {FetchJokesLocalOperation, FetchJokesOperation, FetchJokesOperationModels} from '../../operations/jokes/FetchJokesOperation';
import {OperationError} from '../../operations/base/errors/OperationError';
import {Operation, Result} from '../../operations/base/operations/Operation';
import {OperationQueue} from '../../operations/base/operations/OperationQueue';
import {TaskEnvironment} from '../environment/TaskEnvironment';
import {TaskProtocol} from '../task_protocol/TaskProtocol';
import {Joke} from '../../models/joke/Joke';

export namespace JokeTaskModels {
  export namespace FetchJokes {
    export class Request {
      page: number;
      limit: number;
      orderBy: number;
      startedAt?: string;
      endedAt?: string;

      constructor(page: number, limit: number, orderBy: number, startedAt?: string, endedAt?: string) {
        this.page = page;
        this.limit = limit;
        this.orderBy = orderBy;
        this.startedAt = startedAt;
        this.endedAt = endedAt;
      }
    }

    export class Response {
      jokes?: Joke[];

      constructor(jokes?: Joke[]) {
        this.jokes = jokes;
      }
    }
  }
}

export interface JokeTaskProtocol extends TaskProtocol {
  fetchJokes(model: JokeTaskModels.FetchJokes.Request, completionHandler: Result<JokeTaskModels.FetchJokes.Response>): void;
}

export class JokeTask implements JokeTaskProtocol {
  environment: TaskEnvironment;

  constructor(environment: TaskEnvironment) {
    this.environment = environment;
  }

  //#region Jokes
  fetchJokesOperationQueue: OperationQueue = new OperationQueue();

  fetchJokes(model: JokeTaskModels.FetchJokes.Request, completionHandler: Result<JokeTaskModels.FetchJokes.Response>): void {
    let operationModel = new FetchJokesOperationModels.Request(model.page, model.limit, model.orderBy, model.startedAt, model.endedAt);
    let operation = this.fetchJokesOperation(operationModel, completionHandler);
    this.fetchJokesOperationQueue.addOperation(operation);
  }

  private fetchJokesOperation(model: FetchJokesOperationModels.Request, completionHandler: Result<JokeTaskModels.FetchJokes.Response>): Operation {
    let operationCompletionHandler: Result<FetchJokesOperationModels.Response> = {
      success(value?: FetchJokesOperationModels.Response) {
        completionHandler.success(new JokeTaskModels.FetchJokes.Response(value?.toJokes()));
      },
      failure(error: OperationError) {
        completionHandler.failure(error);
      },
    };
    switch (this.environment) {
      case TaskEnvironment.production:
        return new FetchJokesOperation(model, operationCompletionHandler);
      case TaskEnvironment.development:
        return new FetchJokesOperation(model, operationCompletionHandler);
      case TaskEnvironment.memory:
        return new FetchJokesLocalOperation(model, operationCompletionHandler);
    }
  }
  //#endregion
}
