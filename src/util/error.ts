import { NextFunction, Request, Response } from "express";

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
  if (err instanceof Error) {
    res.status(500).send(err.message);
  } else {
    res.status(500).send("Something went wrong");
  }
};
