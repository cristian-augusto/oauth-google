import {NextFunction, Request, Response} from "express";
import AppError from "../exceptions/app-error.exception";

const errorHandler = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  }

  return response.status(500).json({
    status: 500,
    message: "Internal server error.",
  });
};

export default errorHandler;
