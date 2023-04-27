import {v4 as uuidv4} from 'uuid';
import {OperationError} from '../errors/OperationError';

export class Operation {
  id: string = uuidv4();

  completion?: () => void;

  isCancelled: boolean = false;
  isLoggingEnabled: boolean = false;

  run(completion: () => void) {
    this.completion = completion;
  }

  cancel(): void {
    this.isCancelled = true;
  }

  log(): void {
    if (!this.isLoggingEnabled) {
      return;
    }
  }
}

export interface Result<T> {
  success(value?: T): void;
  failure(error: OperationError): void;
}
