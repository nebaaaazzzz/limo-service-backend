import { NextFunction, Request, Response } from "express";
import {
  JsonWebTokenError,
  NotBeforeError,
  TokenExpiredError,
} from "jsonwebtoken";
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
export const globalErrorHandler = (
  err: Error, // | MulterError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /** errors related to JWT */
  if (err instanceof JsonWebTokenError) {
    /* 
      'invalid token' - the header or payload could not be parsed
      'jwt malformed' - the token does not have three components (delimited by a .)
      'jwt signature is required'
      'invalid signature'
      'jwt audience invalid. expected: [OPTIONS AUDIENCE]'
      'jwt issuer invalid. expected: [OPTIONS ISSUER]'
      'jwt id invalid. expected: [OPTIONS JWT ID]'
      'jwt subject invalid. expected: [OPTIONS SUBJECT]'
    */
    res.status(401).send({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof TokenExpiredError) {
    res.status(401).send({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof NotBeforeError) {
    // Thrown if current time is before the nbf claim.
    res.status(401).send({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("Something went wrong");
  }
};
