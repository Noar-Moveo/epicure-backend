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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const express_1 = __importDefault(require("express"));
const Chef_1 = require("./models/Chef");
const Dish_1 = require("./models/Dish");
const Restaurant_1 = require("./models/Restaurant");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurants = yield Restaurant_1.Restaurant.find()
        .populate("chef", "name")
        .populate("dishes");
    res.send(restaurants);
}));
router.get("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findById(req.params.id)
        .populate("chef", "name")
        .populate("dishes");
    if (!restaurant)
        return res
            .status(404)
            .send("The restaurant with the given ID was not found.");
    res.send(restaurant);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Restaurant_1.validateRestaurant)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const restaurant = new Restaurant_1.Restaurant({
            name: req.body.name,
            image: req.body.image,
            chef: req.body.chef,
            dishes: req.body.dishes || [],
        });
        const savedRestaurant = yield restaurant.save();
        if (req.body.dishes && req.body.dishes.length > 0) {
            yield Promise.all(req.body.dishes.map((dishId) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (req.body.chef) {
            try {
                const chef = yield Chef_1.Chef.findById(req.body.chef);
                if (chef) {
                    chef.restaurants.push(savedRestaurant._id);
                    yield chef.save();
                }
            }
            catch (err) {
                console.error(`Error updating chef with ID ${req.body.chef}:`, err);
            }
        }
        res.status(201).send(savedRestaurant);
    }
    catch (err) {
        res
            .status(500)
            .send("Failed to create restaurant. Please try again later.");
    }
}));
router.put("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        chef: req.body.chef,
        dishes: req.body.dishes,
    }, { new: true });
    if (!restaurant)
        return res
            .status(404)
            .send("The restaurant with the given ID was not found.");
    res.send(restaurant);
}));
router.delete("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurant = yield Restaurant_1.Restaurant.findByIdAndUpdate(req.params.id, { status: "deprecated" }, { new: true });
    if (!restaurant)
        return res
            .status(404)
            .send("The restaurant with the given ID was not found.");
    res.send(restaurant);
}));
exports.default = router;
