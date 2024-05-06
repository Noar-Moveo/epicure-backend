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
exports.activateRestaurantById = exports.deleteRestaurantById = exports.updateRestaurantById = exports.createRestaurant = exports.getRestaurantById = exports.getAllRestaurants = void 0;
const restaurantHandler = __importStar(require("../handlers/restaurantHandler"));
function getAllRestaurants(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10;
            const restaurants = yield restaurantHandler.getAllRestaurants(page, perPage);
            res.send(restaurants);
        }
        catch (error) {
            console.error("Error fetching restaurants:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getAllRestaurants = getAllRestaurants;
function getRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const restaurant = yield restaurantHandler.getRestaurantById(id);
            if (!restaurant) {
                return res
                    .status(404)
                    .send("The restaurant with the given ID was not found.");
            }
            res.send(restaurant);
        }
        catch (error) {
            console.error("Error fetching restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.getRestaurantById = getRestaurantById;
function createRestaurant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurant = yield restaurantHandler.createRestaurant(req.body);
            res.status(201).send(restaurant);
        }
        catch (error) {
            console.error("Failed to create restaurant:", error);
            res
                .status(500)
                .send("Failed to create restaurant. Please try again later.");
        }
    });
}
exports.createRestaurant = createRestaurant;
function updateRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedRestaurant = yield restaurantHandler.updateRestaurantById(id, req.body);
            if (!updatedRestaurant) {
                return res
                    .status(404)
                    .send("The restaurant with the given ID was not found.");
            }
            res.send(updatedRestaurant);
        }
        catch (error) {
            console.error("Error updating restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.updateRestaurantById = updateRestaurantById;
function deleteRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedRestaurant = yield restaurantHandler.deleteRestaurantById(id);
            if (!deletedRestaurant) {
                return res
                    .status(404)
                    .send("The restaurant with the given ID was not found.");
            }
            res.send(deletedRestaurant);
        }
        catch (error) {
            console.error("Error deleting restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.deleteRestaurantById = deleteRestaurantById;
function activateRestaurantById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield restaurantHandler.activateRestaurantById(id);
            res.json({ message: "Restaurant activated successfully." });
        }
        catch (error) {
            console.error("Error activating restaurant:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.activateRestaurantById = activateRestaurantById;
