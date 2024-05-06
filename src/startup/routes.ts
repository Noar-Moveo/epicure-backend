import express from "express";
import { Application } from "express-serve-static-core";
import error from "../middleware/error";
import apiRoutes from "../api/api";

export default function initializeRoutes(app: Application) {
  app.use(express.json());

  app.use('/api', apiRoutes);

  app.use(error);
}
