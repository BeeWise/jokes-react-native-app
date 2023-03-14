import {localizedStrings} from '../../../localization/LocalizationManager';

export class OperationError {
  static noUrlAvailable = new OperationError('noUrlAvailable');
  static noDataAvailable = new OperationError('noDataAvailable');
  static cannotParseResponse = new OperationError('cannotParseResponse');
  static operationCancelled = new OperationError('operationCancelled');
  static noInternetConnection = new OperationError('noInternetConnection');

  message: string;
  code?: number;

  constructor(message: string, code?: number) {
    this.message = message;
    this.code = code;
  }

  isEqualTo(error: OperationError): boolean {
    return this.message === error.message && this.code === error.code;
  }

  localizedMessage(): string {
    if (this.isEqualTo(OperationError.noUrlAvailable)) {
      return localizedStrings['Operation.error.no.url.available'];
    } else if (this.isEqualTo(OperationError.noDataAvailable)) {
      return localizedStrings['Operation.error.no.data.available'];
    } else if (this.isEqualTo(OperationError.cannotParseResponse)) {
      return localizedStrings['Operation.error.cannot.parse.response'];
    } else if (this.isEqualTo(OperationError.operationCancelled)) {
      return localizedStrings['Operation.error.operation.cancelled'];
    } else if (this.isEqualTo(OperationError.noInternetConnection)) {
      return localizedStrings['Operation.error.no.internet.connection'];
    }
    return localizedStrings['Operation.error.unknown'];
  }
}
