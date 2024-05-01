"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const mongoose_1 = __importDefault(require("mongoose"));
const test_json_1 = __importDefault(require("../config/test.json"));
function initializeDB() {
    const db = test_json_1.default.db;
    winston_1.default.add(new winston_1.default.transports.Console({
        format: winston_1.default.format.simple(),
        level: 'info'
    }));
    mongoose_1.default.connect(db)
        .then(() => winston_1.default.info(`Connected to ${db}...`))
        .catch(err => winston_1.default.error('Could not connect to MongoDB...', err));
}
exports.default = initializeDB;
