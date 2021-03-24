export class AppError extends Error {
  public readonly isTrusted: boolean;
  public readonly httpStatusCode: number;
  public readonly httpMessage: string;

  constructor(message: string, httpMessage: string, httpStatusCode: number, isTrusted = true) {
    super(message);
    this.name = AppError.name;
    this.isTrusted = isTrusted;
    this.httpStatusCode = httpStatusCode;
    this.httpMessage = httpMessage;
  }
}