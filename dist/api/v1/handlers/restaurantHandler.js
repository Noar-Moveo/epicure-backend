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
exports.activateRestaurantById = exports.deleteRestaurantById = exports.updateRestaurantById = exports.createRestaurant = exports.getRestaurantById = exports.getAllRestaurants = void 0;
const Restaurant_1 = require("../../../models/Restaurant");
const Chef_1 = require("../../../models/Chef");
const Dish_1 = require("../../../models/Dish");
function getAllRestaurants(page, perPage) {
    return __awaiter(this, void 0, void 0, function* () {
        const skip = (page - 1) * perPage;
        const restaurants = yield Restaurant_1.Restaurant.find({ status: "active" })
            .populate("chef", "name")
            .populate("dishes")
            .skip(skip)
            .limit(perPage);
        return restaurants;
    });
}
exports.getAllRestaurants = getAllRestaurants;
function getRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield Restaurant_1.Restaurant.findById(id)
            .populate("chef", "name")
            .populate("dishes");
        if (!restaurant) {
            throw new Error("The restaurant with the given ID was not found.");
        }
        if (restaurant.status === "deprecated") {
            throw new Error("The restaurant is deprecated.");
        }
        return restaurant;
    });
}
exports.getRestaurantById = getRestaurantById;
function createRestaurant(restaurantData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = (0, Restaurant_1.validateRestaurant)(restaurantData);
            if (error)
                throw new Error(error.details[0].message);
            const chef = yield Chef_1.Chef.findOne({
                _id: restaurantData.chef,
                status: "active",
            });
            if (!chef) {
                throw new Error("The chef with the provided ID does not exist.");
            }
            if (restaurantData.dishes && restaurantData.dishes.length > 0) {
                for (const dishId of restaurantData.dishes) {
                    const dish = yield Dish_1.Dish.findOne({ _id: dishId, status: "active" });
                    if (!dish) {
                        throw new Error(`The dish with ID ${dishId} does not exist.`);
                    }
                }
            }
            const restaurant = new Restaurant_1.Restaurant({
                name: restaurantData.name,
                image: restaurantData.image,
                chef: restaurantData.chef,
                dishes: restaurantData.dishes || [],
            });
            const savedRestaurant = yield restaurant.save();
            chef.restaurants.push(savedRestaurant._id);
            yield chef.save();
            if (restaurantData.dishes && restaurantData.dishes.length > 0) {
                yield Promise.all(restaurantData.dishes.map((dishId) => __awaiter(this, void 0, void 0, function* () {
                    const dish = yield Dish_1.Dish.findOne({ _id: dishId, status: "active" });
                    if (dish) {
                        dish.restaurant = savedRestaurant._id;
                        yield dish.save();
                    }
                })));
            }
            return savedRestaurant;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createRestaurant = createRestaurant;
function updateRestaurantById(id, restaurantData) {
    return __awaiter(this, void 0, void 0, function* () {
        const isStatusChangedToActive = restaurantData.status === "active" &&
            restaurantData.status !== "deprecated";
        let restaurant;
        if (isStatusChangedToActive) {
            restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(id, Object.assign({}, restaurantData), { new: true });
            const chef = yield Chef_1.Chef.findById(restaurantData.chef);
            if (chef) {
                chef.restaurants.push(restaurant._id);
                yield chef.save();
            }
        }
        else {
            restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(id, Object.assign({}, restaurantData), { new: true });
        }
        return restaurant;
    });
}
exports.updateRestaurantById = updateRestaurantById;
function deleteRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const restaurant = yield Restaurant_1.Restaurant.findById(id);
            if (!restaurant) {
                throw new Error("Restaurant not found.");
            }
            console.log("Restaurant ID:", restaurant._id);
            restaurant.status = "deprecated";
            yield restaurant.save();
            const chef = yield Chef_1.Chef.findById(restaurant.chef);
            if (!chef) {
                throw new Error("Chef not found.");
            }
            console.log("Chef:", chef);
            console.log("Chef's Restaurants:", chef.restaurants);
            chef.restaurants = chef.restaurants.filter((restId) => restId.toString() !== id.toString());
            yield chef.save();
            yield Dish_1.Dish.updateMany({ restaurant: id }, { status: "deprecated" });
            return restaurant;
        }
        catch (error) {
            throw new Error("Error deleting restaurant.");
        }
    });
}
exports.deleteRestaurantById = deleteRestaurantById;
function activateRestaurantById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const restaurant = yield Restaurant_1.Restaurant.findById(id);
        if (!restaurant) {
            throw new Error("Restaurant not found.");
        }
        if (restaurant.status !== "deprecated") {
            throw new Error("Restaurant is not deprecated.");
        }
        restaurant.status = "active";
        yield restaurant.save();
    });
}
exports.activateRestaurantById = activateRestaurantById;
