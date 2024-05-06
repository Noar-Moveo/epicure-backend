import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log("validate middleware called");

  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("Invalid ID.");

  next();
}
