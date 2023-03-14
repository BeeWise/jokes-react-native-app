import {Expose, Type, plainToInstance} from 'class-transformer';
import {OperationError} from '../errors/OperationError';
import {Operation, Result} from './Operation';
import {OperationStatusCode} from './OperationStatusCode';
import {OperationQueue} from './OperationQueue';
import {Configuration} from '../../../../config';

export interface AsynchronousOperationInterface<T> {
  request(): XMLHttpRequest;
  parse(body: any): T | undefined;
}

export class AsynchronousOperation<T> extends Operation implements AsynchronousOperationInterface<T> {
  model?: any;
  completionHandler?: Result<T>;
  queue: OperationQueue = new OperationQueue();

  constructor(model?: any, completionHandler?: Result<T>) {
    super();
    this.model = model;
    this.completionHandler = completionHandler;
  }

  request(): XMLHttpRequest {
    return new XMLHttpRequest();
  }

  parse(_body: any): T | undefined {
    return undefined;
  }

  run(completion: () => void): void {
    super.run(completion);

    if (this.shouldCancelOperation()) {
      return;
    }

    let request = this.request();
    // TODO: - Add better logging?
    request.onload = () => {
      if (Configuration.instance.operationLoggingEnabled()) {
        console.log('onload url:' + request.responseURL + '; status: ' + request.status + '; response: ' + request.responseText);
      }

      switch (request.status) {
        case OperationStatusCode.ok:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.created:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.accepted:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.nonAuthoritativeInformation:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.noContent:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.resetContent:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.partialContent:
          this.verifyData(request.responseText);
          break;
        case OperationStatusCode.unprocessableEntity:
          this.verifyError(request.responseText);
          break;
        case OperationStatusCode.unauthorized:
          this.verifyError(request.responseText);
          break;
        default:
          this.noDataAvailableErrorBlock();
          break;
      }
    };
    request.onerror = () => {
      this.noDataAvailableErrorBlock();
    };
    request.ontimeout = () => {
      this.noDataAvailableErrorBlock();
    };
  }

  //#region region Verify & decode data
  verifyData(data?: string) {
    if (this.shouldCancelOperation()) {
      return;
    }

    if (data !== undefined) {
      this.decodeData(data);
    } else {
      this.noDataAvailableErrorBlock();
    }
  }

  decodeData(data: string) {
    if (this.shouldCancelOperation()) {
      return;
    }
    let value = this.parseData(data);
    if (value !== undefined) {
      this.transformData(value);
    } else {
      this.decodeError(data);
    }
  }

  parseData(data: string): T | undefined {
    let json = JSON.parse(data);
    return this.parse(json);
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
  //#endregion

  //#region Verify & decode error
  verifyError(data?: string) {
    if (this.shouldCancelOperation()) {
      return;
    }

    if (data !== undefined) {
      this.decodeError(data);
    } else {
      this.noDataAvailableErrorBlock();
    }
  }

  decodeError(data: string) {
    if (this.shouldCancelOperation()) {
      return;
    }

    let value = this.parseError(data);
    if (value !== undefined) {
      this.transformError(value);
    } else {
      this.cannotParseResponseErrorBlock();
    }
  }

  parseError(data: string): AsynchronousOperation.ServerError | undefined {
    let json = JSON.parse(data);
    return plainToInstance(AsynchronousOperation.ServerError, json);
  }

  transformError(value: AsynchronousOperation.ServerError) {
    let errors = value.errors;
    if (errors !== undefined && errors.length > 0) {
      let error = errors[0];
      let description = error.description;
      if (error !== undefined && description !== undefined) {
        this.responseErrorBlock(description, error.code);
      } else {
        this.cannotParseResponseErrorBlock();
      }
    } else {
      this.cannotParseResponseErrorBlock();
    }
  }
  //#endregion

  //#region Operation errors
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

  responseErrorBlock(errorDescription: string, code?: number): void {
    this.completionHandler?.failure(new OperationError(errorDescription, code));

    if (this.completion !== undefined) {
      this.completion();
    }
  }
  //#endregion
}

export namespace AsynchronousOperation {
  export class ServerError {
    @Expose({name: 'errors'})
    @Type(() => Errors)
    errors?: Errors[];
  }

  export class Errors {
    @Expose({name: 'description'})
    description?: string;

    @Expose({name: 'code'})
    code?: number;
  }
}
