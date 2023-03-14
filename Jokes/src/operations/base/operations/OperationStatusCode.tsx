export enum OperationStatusCode {
  ok = 200,
  created = 201,
  accepted = 202,
  nonAuthoritativeInformation = 203,
  noContent = 204,
  resetContent = 205,
  partialContent = 206,

  unauthorized = 401,

  unprocessableEntity = 422,
}
