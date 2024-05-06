"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Your API description',
    },
    servers: [
        {
            url: 'http://localhost:3000', // Update with your server URL
            description: 'Development server',
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./api/v1/**/*.ts'], // Update with the path to your route/controller files
};
exports.default = (0, swagger_jsdoc_1.default)(options);
