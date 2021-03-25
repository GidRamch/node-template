export class AppError extends Error {
  public readonly isTrusted: boolean;
  public readonly httpStatusCode: number;
  public readonly httpData: string;

  constructor(message: string, httpData: any, httpStatusCode: number, isTrusted = true) {
    super(message);
    this.name = AppError.name;
    this.isTrusted = isTrusted;
    this.httpStatusCode = httpStatusCode;
    this.httpData = httpData;
  }
}