import {OperationError} from '../errors/OperationError';
import {Operation, Result} from './Operation';

export class JSONFileOperation<T> extends Operation {
  model?: any;
  completionHandler?: Result<T>;

  delay: number = 0;
  shouldFail: boolean = false;

  constructor(model?: any, completionHandler?: Result<T>) {
    super();
    this.model = model;
    this.completionHandler = completionHandler;
  }

  json(): any | undefined {
    return undefined;
  }

  run(completion: () => void): void {
    super.run(completion);

    if (this.shouldCancelOperation()) {
      return;
    }

    setTimeout(() => {
      if (this.shouldFail) {
        this.noDataAvailableErrorBlock();
      } else {
        this.fetchJson();
      }
    }, this.delay);
  }

  fetchJson() {
    let json = this.json();
    if (json === undefined) {
      this.noDataAvailableErrorBlock();
      return;
    }

    let value = this.parse(json);
    if (value !== undefined) {
      this.transformData(value);
    } else {
      this.cannotParseResponseErrorBlock();
    }
  }

  parse(_body: any): T | undefined {
    return undefined;
  }

  transformData(response?: T) {
    if (this.shouldCancelOperation()) {
      return;
    }

    if (response !== undefined) {
      this.successfulResultBlock(response);
    } else {
      this.noDataAvailableErrorBlock();
    }
  }

  shouldCancelOperation(): boolean {
    if (this.isCancelled) {
      this.cancelledOperationErrorBlock();
      return true;
    }
    return false;
  }

  cancelledOperationErrorBlock(): void {
    this.completionHandler?.failure(OperationError.operationCancelled);

    if (this.completion !== undefined) {
      this.completion();
    }
  }

  noDataAvailableErrorBlock(): void {
    this.completionHandler?.failure(OperationError.noDataAvailable);

    if (this.completion !== undefined) {
      this.completion();
    }
  }

  cannotParseResponseErrorBlock(): void {
    this.completionHandler?.failure(OperationError.cannotParseResponse);

    if (this.completion !== undefined) {
      this.completion();
    }
  }

  successfulResultBlock(value?: T): void {
    this.completionHandler?.success(value);

    if (this.completion !== undefined) {
      this.completion();
    }
  }
}
