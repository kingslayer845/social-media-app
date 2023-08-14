class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational = true;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 500 ? "error" : "fail";
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
