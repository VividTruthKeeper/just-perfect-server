import { CustomError } from "./custom-error";

export class GenericError extends CustomError {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, GenericError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
