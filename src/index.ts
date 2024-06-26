import winston from "winston";
import express from "express";
import http from "http";
import initializeDB from "./startup/db";
import initializeRoutes from "./startup/routes";
import initializeLogging from "./startup/logging";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swaggerConfig"; 

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initializeDB();
initializeRoutes(app);
initializeLogging();

const server = http.createServer(app);
const port = process.env.PORT || 3000;
const runningServer = server.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = { server: runningServer, app };
