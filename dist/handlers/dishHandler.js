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
exports.deleteDishById = exports.updateDishById = exports.createDish = exports.getDishById = exports.getAllDishes = void 0;
const Dish_1 = require("../models/Dish");
const Restaurant_1 = require("../models/Restaurant");
function getAllDishes() {
    return __awaiter(this, void 0, void 0, function* () {
        const dishes = yield Dish_1.Dish.find().populate("restaurant", "name");
        return dishes;
    });
}
exports.getAllDishes = getAllDishes;
function getDishById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dish = yield Dish_1.Dish.findById(id).populate("restaurant", "name");
        return dish;
    });
}
exports.getDishById = getDishById;
function createDish(dishData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = (0, Dish_1.validateDish)(dishData);
            if (error)
                throw new Error(error.details[0].message);
            const dish = new Dish_1.Dish({
                name: dishData.name,
                price: dishData.price,
                ingredients: dishData.ingredients || [],
                tags: dishData.tags || [],
                restaurant: dishData.restaurant,
            });
            const savedDish = yield dish.save();
            if (dishData.restaurant) {
                try {
                    const restaurant = yield Restaurant_1.Restaurant.findById(dishData.restaurant);
                    if (restaurant) {
                        restaurant.dishes.push(savedDish._id);
                        yield restaurant.save();
                    }
                }
                catch (err) {
                    console.error(`Error updating restaurant with ID ${dishData.restaurant}:`, err);
                }
            }
            return savedDish;
        }
        catch (err) {
            throw new Error("Failed to create dish. Please try again later.");
        }
    });
}
exports.createDish = createDish;
function updateDishById(id, dishData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = (0, Dish_1.validateDish)(dishData);
            if (error)
                throw new Error(error.details[0].message);
            const dish = yield Dish_1.Dish.findByIdAndUpdate(id, {
                name: dishData.name,
                price: dishData.price,
                ingredients: dishData.ingredients,
                tags: dishData.tags,
                restaurant: dishData.restaurant,
            }, { new: true });
            return dish;
        }
        catch (error) {
            throw new Error("Error updating dish.");
        }
    });
}
exports.updateDishById = updateDishById;
function deleteDishById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dish = yield Dish_1.Dish.findByIdAndUpdate(id, { status: "deprecated" }, { new: true });
            return dish;
        }
        catch (error) {
            throw new Error("Error deleting dish.");
        }
    });
}
exports.deleteDishById = deleteDishById;
