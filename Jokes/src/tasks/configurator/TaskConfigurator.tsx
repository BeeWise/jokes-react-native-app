import {TaskEnvironment} from '../environment/TaskEnvironment';
import {JokeTaskProtocol, JokeTask} from '../joke/JokeTask';

export class TaskConfigurator {
  static instance = new TaskConfigurator();

  environment: TaskEnvironment = TaskEnvironment.memory;

  jokeTask(): JokeTaskProtocol {
    return new JokeTask(this.environment);
  }
}
