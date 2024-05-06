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
exports.deleteChefById = exports.updateChefById = exports.createChef = exports.getChefById = exports.getAllChefs = void 0;
const Chef_1 = require("../models/Chef");
const Restaurant_1 = require("../models/Restaurant");
function getAllChefs() {
    return __awaiter(this, void 0, void 0, function* () {
        const chefs = yield Chef_1.Chef.find().populate('restaurants', 'name');
        return chefs;
    });
}
exports.getAllChefs = getAllChefs;
function getChefById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const chef = yield Chef_1.Chef.findById(id).populate('restaurants', 'name');
        return chef;
    });
}
exports.getChefById = getChefById;
function createChef(chefData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Chef_1.validateChef)(chefData);
        if (error)
            throw new Error(error.details[0].message);
        const chef = new Chef_1.Chef({
            name: chefData.name,
            image: chefData.image,
            description: chefData.description,
            status: 'active',
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
    });
}
exports.createChef = createChef;
function updateChefById(id, chefData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { error } = (0, Chef_1.validateChef)(chefData);
        if (error)
            throw new Error(error.details[0].message);
        const chef = yield Chef_1.Chef.findByIdAndUpdate(id, {
            name: chefData.name,
            image: chefData.image,
            description: chefData.description,
            restaurants: chefData.restaurants,
        }, { new: true });
        return chef;
    });
}
exports.updateChefById = updateChefById;
function deleteChefById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const chef = yield Chef_1.Chef.findByIdAndUpdate(id, { status: 'deprecated' }, { new: true });
        return chef;
    });
}
exports.deleteChefById = deleteChefById;
