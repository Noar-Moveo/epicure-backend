"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("../middleware/error"));
const api_1 = __importDefault(require("../api/api"));
function initializeRoutes(app) {
    app.use(express_1.default.json());
    app.use('/api', api_1.default);
    app.use(error_1.default);
}
exports.default = initializeRoutes;
