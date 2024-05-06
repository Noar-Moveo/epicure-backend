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
exports.activateDishById = exports.deleteDishById = exports.updateDishById = exports.createDish = exports.getDishById = exports.getAllDishes = void 0;
const dishHandler = __importStar(require("../handlers/dishHandler"));
function getAllDishes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10;
            const dishes = yield dishHandler.getAllDishes(page, perPage);
            res.send(dishes);
        }
        catch (error) {
            console.error("Error fetching dishes:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getAllDishes = getAllDishes;
function getDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const dish = yield dishHandler.getDishById(id);
            if (!dish) {
                return res.status(404).send("The dish with the given ID was not found.");
            }
            res.send(dish);
        }
        catch (error) {
            console.error("Error fetching dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getDishById = getDishById;
function createDish(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dish = yield dishHandler.createDish(req.body);
            res.status(201).send(dish);
        }
        catch (error) {
            console.error("Failed to create dish:", error);
            res.status(500).send("Failed to create dish. Please try again later.");
        }
    });
}
exports.createDish = createDish;
function updateDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedDish = yield dishHandler.updateDishById(id, req.body);
            if (!updatedDish) {
                return res.status(404).send("The dish with the given ID was not found.");
            }
            res.send(updatedDish);
        }
        catch (error) {
            console.error("Error updating dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.updateDishById = updateDishById;
function deleteDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedDish = yield dishHandler.deleteDishById(id);
            if (!deletedDish) {
                return res.status(404).send("The dish with the given ID was not found.");
            }
            res.send(deletedDish);
        }
        catch (error) {
            console.error("Error deleting dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.deleteDishById = deleteDishById;
function activateDishById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield dishHandler.activateDishById(id);
            res.json({ message: "Dish activated successfully." });
        }
        catch (error) {
            console.error("Error activating dish:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.activateDishById = activateDishById;
