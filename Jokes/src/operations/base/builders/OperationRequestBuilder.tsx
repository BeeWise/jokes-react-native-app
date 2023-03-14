import {instanceToPlain} from 'class-transformer';

interface RequestBuilderInterface {
  url(): string;
  httpMethod(): string;
  requiresAuthorization(): boolean;
  request(): XMLHttpRequest;
  queryParameters(): Map<string, string>;
  bodyParameters(): Object | undefined;
}

export enum HTTPMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export class OperationRequestBuilder<T> implements RequestBuilderInterface {
  model: T;

  constructor(model: T) {
    this.model = model;
  }

  url(): string {
    return '';
  }

  httpMethod(): string {
    return HTTPMethod.get.toString();
  }

  requiresAuthorization(): boolean {
    return false;
  }

  bodyParameters(): Object | undefined {
    return undefined;
  }

  queryParameters(): Map<string, string> {
    return new Map();
  }

  request(): XMLHttpRequest {
    let queryParameters = this.queryParameters();
    let url = this.withQuery(this.url(), queryParameters);

    let request = new XMLHttpRequest();
    request.open(this.httpMethod(), url);

    for (const [key, value] of this.httpHeaders().entries()) {
      request.setRequestHeader(key, value);
    }

    let bodyParameters = this.bodyParameters();
    if (bodyParameters !== undefined) {
      request.send(JSON.stringify(instanceToPlain(bodyParameters)));
    } else {
      request.send();
    }

    return request;
  }

  private httpHeaders(): Map<string, string> {
    let parameters = new Map();
    parameters.set('content-type', 'application/json');
    parameters.set('accept', 'application/json');
    return parameters;
  }

  private withQuery(url: string, parameters: Map<string, string>): string {
    let finalUrl = new URL(url);
    for (const [key, value] of parameters) {
      finalUrl.searchParams.set(key, value);
    }
    return finalUrl.toString();
  }
}
