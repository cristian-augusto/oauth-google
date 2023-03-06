export default class AppError extends Error {
  public message: string;
  public statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}
