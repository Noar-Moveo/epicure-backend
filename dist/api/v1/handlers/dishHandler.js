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
exports.activateDishById = exports.deleteDishById = exports.updateDishById = exports.createDish = exports.getDishById = exports.getAllDishes = void 0;
const Dish_1 = require("../../../models/Dish");
const Restaurant_1 = require("../../../models/Restaurant");
function getAllDishes(page, perPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const skip = (page - 1) * perPage;
        const dishes = yield Dish_1.Dish.find({ status: "active" })
            .populate("restaurant", "name")
            .skip(skip)
            .limit(perPage);
        return dishes;
    });
}
exports.getAllDishes = getAllDishes;
function getDishById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dish = yield Dish_1.Dish.findById(id).populate("restaurant", "name");
        if (!dish) {
            throw new Error("The dish with the given ID was not found.");
        }
        if (dish.status === "deprecated") {
            throw new Error("The dish is deprecated.");
        }
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
            if (dishData.restaurant) {
                const existingRestaurant = yield Restaurant_1.Restaurant.findOne({
                    _id: dishData.restaurant,
                    status: "active",
                });
                if (!existingRestaurant) {
                    throw new Error(`The restaurant with ID ${dishData.restaurant} does not exist.`);
                }
            }
            const dish = new Dish_1.Dish({
                name: dishData.name,
                price: dishData.price,
                ingredients: dishData.ingredients || [],
                tags: dishData.tags || [],
                restaurant: dishData.restaurant,
            });
            const savedDish = yield dish.save();
            console.log("Dish created:", savedDish);
            if (dishData.restaurant) {
                const restaurant = yield Restaurant_1.Restaurant.findById(dishData.restaurant);
                if (restaurant) {
                    restaurant.dishes.push(savedDish._id);
                    yield restaurant.save();
                }
            }
            return savedDish;
        }
        catch (err) {
            if (err.message.startsWith("The restaurant with ID")) {
                throw new Error(err.message);
            }
            else {
                throw new Error("Failed to create dish. " + err.message);
            }
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
            const dish = yield Dish_1.Dish.findById(id);
            if (!dish) {
                throw new Error("Dish not found.");
            }
            const isStatusChangingToActive = dish.status === "deprecated" && dishData.status === "active";
            dish.name = dishData.name;
            dish.price = dishData.price;
            dish.ingredients = dishData.ingredients;
            dish.tags = dishData.tags;
            dish.status = dishData.status;
            dish.restaurant = dishData.restaurant;
            yield dish.save();
            if (isStatusChangingToActive && dish.restaurant) {
                const restaurant = yield Restaurant_1.Restaurant.findById(dish.restaurant);
                if (restaurant) {
                    restaurant.dishes.push(dish._id);
                    yield restaurant.save();
                }
            }
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
            const dish = yield Dish_1.Dish.findById(id);
            if (!dish) {
                throw new Error("Dish not found.");
            }
            dish.status = "deprecated";
            yield dish.save();
            const restaurant = yield Restaurant_1.Restaurant.findOne({ dishes: id });
            if (restaurant) {
                restaurant.dishes = restaurant.dishes.filter((dishId) => dishId.toString() !== id);
                yield restaurant.save();
            }
            return dish;
        }
        catch (error) {
            throw new Error("Error deleting dish.");
        }
    });
}
exports.deleteDishById = deleteDishById;
function activateDishById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const dish = yield Dish_1.Dish.findById(id);
        if (!dish) {
            throw new Error("Dish not found.");
        }
        if (dish.status !== "deprecated") {
            throw new Error("Restaurant is not deprecated.");
        }
        dish.status = "active";
        yield dish.save();
    });
}
exports.activateDishById = activateDishById;
