"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
require("winston-mongodb");
const test_json_1 = __importDefault(require("../config/test.json"));
function initializeLogging() {
    const db = test_json_1.default.db;
    const logger = winston_1.default.createLogger({
        transports: [
            new winston_1.default.transports.File({ filename: 'uncaughtExceptions.log' })
        ],
        exceptionHandlers: [
            new winston_1.default.transports.File({ filename: 'uncaughtExceptions.log' })
        ]
    });
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    logger.add(new winston_1.default.transports.File({ filename: 'logfile.log' }));
    logger.add(new winston_1.default.transports.MongoDB({
        db: db,
        level: 'info'
    }));
}
exports.default = initializeLogging;
