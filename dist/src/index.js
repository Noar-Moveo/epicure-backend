"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJSDoc = __importStar(require("../swagger.json"));
const app = (0, express_1.default)();
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Restaurant Management API',
        version: '1.0.0',
        description: 'This API manages chefs, dishes, and restaurants.',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        }
    ],
};
const options = {
    swaggerDefinition,
    apis: ['/src/api/v1/routes/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
//const swaggerDocument = YAML.load('./swagger.yaml');
(0, db_1.default)();
(0, routes_1.default)(app);
(0, logging_1.default)();
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
const server = http_1.default.createServer(app);
const port = process.env.PORT || 3000;
const runningServer = server.listen(port, () => winston_1.default.info(`Listening on port ${port}...`));
module.exports = { server: runningServer, app };
