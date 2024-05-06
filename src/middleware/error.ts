import winston from "winston";
import { Request, Response, NextFunction } from "express";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Error middleware called");
  winston.error(err.message, err);

  res.status(500).send("Something failed.");
}
