"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./startup/db"));
const routes_1 = __importDefault(require("./startup/routes"));
const logging_1 = __importDefault(require("./startup/logging"));
const app = (0, express_1.default)();
(0, db_1.default)();
(0, routes_1.default)(app);
(0, logging_1.default)();
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
const runningServer = server.listen(port, () => winston_1.default.info(`Listening on port ${port}...`));
module.exports = { server: runningServer, app };
