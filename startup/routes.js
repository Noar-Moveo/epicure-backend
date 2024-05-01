"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Restaurants_1 = __importDefault(require("../routes/Restaurants"));
const Chefs_1 = __importDefault(require("../routes/Chefs"));
const Dishes_1 = __importDefault(require("../routes/Dishes"));
const error_1 = __importDefault(require("../middleware/error"));
function initializeRoutes(app) {
    app.use(express_1.default.json());
    app.use('/api/restaurants', Restaurants_1.default);
    app.use('/api/chefs', Chefs_1.default);
    app.use('/api/dishes', Dishes_1.default);
    app.use(error_1.default);
}
exports.default = initializeRoutes;
