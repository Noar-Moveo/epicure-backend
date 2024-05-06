"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchHandler = void 0;
const Chef_1 = require("../../../models/Chef");
const Restaurant_1 = require("../.././../models/Restaurant");
const Dish_1 = require("../../../models/Dish");
const searchHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.q ? req.query.q : "";
        const [chefs, restaurants, dishes] = yield Promise.all([
            Chef_1.Chef.find({
                name: { $regex: searchQuery, $options: "i" },
                status: "active",
            }),
            Restaurant_1.Restaurant.find({
                name: { $regex: searchQuery, $options: "i" },
                status: "active",
            }),
            Dish_1.Dish.find({
                name: { $regex: searchQuery, $options: "i" },
                status: "active",
            }),
        ]);
        res.json({ chefs, restaurants, dishes });
    }
    catch (error) {
        console.error("Error occurred during search:", error);
        res.status(500).json({ error: "An error occurred during search" });
    }
});
exports.searchHandler = searchHandler;
