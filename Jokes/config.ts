import {ENVIRONMENT, OPERATION_LOGGING_ENABLED, JOKES_ENDPOINT} from 'react-native-dotenv';

export class Configuration {
  static instance = new Configuration();

  environment(): string {
    return ENVIRONMENT;
  }

  operationLoggingEnabled(): boolean {
    return OPERATION_LOGGING_ENABLED === 'false' ? false : true;
  }

  jokesEndpoint(): string {
    return JOKES_ENDPOINT;
  }
}
