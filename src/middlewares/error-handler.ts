// Types
import { Request, Response, NextFunction } from "express";

// Errors
import { CustomError } from "../errors/custom-error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  if (!res.statusCode) return next();
  else
    res.status(400).send({
      errors: [{ message: "Something went wrong" }],
    });
};
