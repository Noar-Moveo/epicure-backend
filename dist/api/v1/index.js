"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chefRouter_1 = __importDefault(require("./routes/chefRouter"));
const dishRouter_1 = __importDefault(require("./routes/dishRouter"));
const restaurantRouter_1 = __importDefault(require("./routes/restaurantRouter"));
const searchRoute_1 = __importDefault(require("./routes/searchRoute"));
const v1Routes = express_1.default.Router();
v1Routes.use("/chefs", chefRouter_1.default);
v1Routes.use("/dishes", dishRouter_1.default);
v1Routes.use("/restaurants", restaurantRouter_1.default);
v1Routes.use("/search", searchRoute_1.default);
exports.default = v1Routes;
