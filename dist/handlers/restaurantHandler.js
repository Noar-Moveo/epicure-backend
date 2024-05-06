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
exports.deleteRestaurantById = exports.updateRestaurantById = exports.createRestaurant = exports.getRestaurantById = exports.getAllRestaurants = void 0;
const Restaurant_1 = require("../models/Restaurant");
const Chef_1 = require("../models/Chef");
const Dish_1 = require("../models/Dish");
function getAllRestaurants() {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurants = yield Restaurant_1.Restaurant.find()
            .populate('chef', 'name')
            .populate('dishes');
        return restaurants;
    });
}
exports.getAllRestaurants = getAllRestaurants;
function getRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield Restaurant_1.Restaurant.findById(id)
            .populate('chef', 'name')
            .populate('dishes');
        return restaurant;
    });
}
exports.getRestaurantById = getRestaurantById;
function createRestaurant(restaurantData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Restaurant_1.validateRestaurant)(restaurantData);
        if (error)
            throw new Error(error.details[0].message);
        const restaurant = new Restaurant_1.Restaurant({
            name: restaurantData.name,
            image: restaurantData.image,
            chef: restaurantData.chef,
            dishes: restaurantData.dishes || [],
        });
        const savedRestaurant = yield restaurant.save();
        if (restaurantData.dishes && restaurantData.dishes.length > 0) {
            yield Promise.all(restaurantData.dishes.map((dishId) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const dish = yield Dish_1.Dish.findById(dishId);
                    if (dish) {
                        dish.restaurant = savedRestaurant._id;
                        yield dish.save();
                    }
                }
                catch (err) {
                    console.error(`Error updating dish with ID ${dishId}:`, err);
                }
            })));
        }
        if (restaurantData.chef) {
            try {
                const chef = yield Chef_1.Chef.findById(restaurantData.chef);
                if (chef) {
                    chef.restaurants.push(savedRestaurant._id);
                    yield chef.save();
                }
            }
            catch (err) {
                console.error(`Error updating chef with ID ${restaurantData.chef}:`, err);
            }
        }
        return savedRestaurant;
    });
}
exports.createRestaurant = createRestaurant;
function updateRestaurantById(id, restaurantData) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(id, {
            name: restaurantData.name,
            image: restaurantData.image,
            chef: restaurantData.chef,
            dishes: restaurantData.dishes,
        }, { new: true });
        return restaurant;
    });
}
exports.updateRestaurantById = updateRestaurantById;
function deleteRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(id, { status: 'deprecated' }, { new: true });
        return restaurant;
    });
}
exports.deleteRestaurantById = deleteRestaurantById;
