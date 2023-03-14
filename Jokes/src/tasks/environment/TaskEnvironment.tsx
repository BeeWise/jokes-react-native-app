import {Configuration} from '../../../config';

export enum TaskEnvironment {
  production = 'production',
  development = 'development',
  memory = 'memory',
}

export function taskEnvironment(): TaskEnvironment {
  let value = Configuration.instance.environment();
  return TaskEnvironment[value as keyof typeof TaskEnvironment];
}
