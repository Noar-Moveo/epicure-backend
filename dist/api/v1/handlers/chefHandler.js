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
exports.activateChefById = exports.deleteChefById = exports.updateChefById = exports.createChef = exports.getChefById = exports.getAllChefs = void 0;
const Chef_1 = require("../../../models/Chef");
const Restaurant_1 = require("../../../models/Restaurant");
function getAllChefs(skip, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const chefs = yield Chef_1.Chef.aggregate([
            { $match: { status: "active" } },
            { $sort: { _id: 1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurants",
                    foreignField: "_id",
                    as: "restaurants",
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    description: 1,
                    restaurants: { $arrayElemAt: ["$restaurants.name", 0] },
                },
            },
        ]);
        return chefs;
    });
}
exports.getAllChefs = getAllChefs;
function getChefById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const chef = yield Chef_1.Chef.findById(id).populate("restaurants", "name");
        if (!chef) {
            throw new Error("The chef with the given ID was not found.");
        }
        if (chef.status === "deprecated") {
            throw new Error("The chef is deprecated.");
        }
        return chef;
    });
}
exports.getChefById = getChefById;
function createChef(chefData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error } = (0, Chef_1.validateChef)(chefData);
            if (error)
                throw new Error(error.details[0].message);
            if (chefData.restaurants && chefData.restaurants.length > 0) {
                for (const restaurantId of chefData.restaurants) {
                    const restaurant = yield Restaurant_1.Restaurant.findOne({
                        _id: restaurantId,
                        status: "active",
                    });
                    if (!restaurant) {
                        throw new Error(`The restaurant with ID ${restaurantId} does not exist.`);
                    }
                }
            }
            const chef = new Chef_1.Chef({
                name: chefData.name,
                image: chefData.image,
                description: chefData.description,
                status: "active",
                restaurants: chefData.restaurants || [],
            });
            const savedChef = yield chef.save();
            if (chefData.restaurants && chefData.restaurants.length > 0) {
                yield Promise.all(chefData.restaurants.map((restaurantId) => __awaiter(this, void 0, void 0, function* () {
                    const restaurant = yield Restaurant_1.Restaurant.findById(restaurantId);
                    if (restaurant) {
                        restaurant.chef = savedChef._id;
                        yield restaurant.save();
                    }
                })));
            }
            return savedChef;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createChef = createChef;
function updateChefById(id, chefData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Chef_1.validateChef)(chefData);
        if (error)
            throw new Error(error.details[0].message);
        if (chefData.restaurants && chefData.restaurants.length > 0) {
            const invalidRestaurantIds = [];
            for (const restaurantId of chefData.restaurants) {
                const restaurant = yield Restaurant_1.Restaurant.findById(restaurantId);
                if (!restaurant) {
                    invalidRestaurantIds.push(restaurantId);
                }
                else {
                    if (restaurant.status === "deprecated") {
                        throw new Error("The restaurant is deprecated.");
                    }
                }
            }
            if (invalidRestaurantIds.length > 0) {
                throw new Error(`The following restaurants do not exist: ${invalidRestaurantIds.join(", ")}`);
            }
        }
        const chef = yield Chef_1.Chef.findByIdAndUpdate(id, {
            name: chefData.name,
            image: chefData.image,
            description: chefData.description,
            status: chefData.status,
            restaurants: chefData.restaurants,
        }, { new: true });
        return chef;
    });
}
exports.updateChefById = updateChefById;
function deleteChefById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chef = yield Chef_1.Chef.findById(id);
            if (!chef) {
                throw new Error("Chef not found.");
            }
            chef.status = "deprecated";
            yield chef.save();
            // const restaurants = await Restaurant.find({ chef: id });
            // await Promise.all(
            //   restaurants.map(async (restaurant) => {
            //     restaurant.status = "deprecated";
            //     await restaurant.save();
            //   })
            // );
            return chef;
        }
        catch (error) {
            throw new Error("Error deleting chef.");
        }
    });
}
exports.deleteChefById = deleteChefById;
function activateChefById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const chef = yield Chef_1.Chef.findById(id);
        if (!chef) {
            throw new Error("Dish not found.");
        }
        if (chef.status !== "deprecated") {
            throw new Error("Restaurant is not deprecated.");
        }
        chef.status = "active";
        yield chef.save();
    });
}
exports.activateChefById = activateChefById;
