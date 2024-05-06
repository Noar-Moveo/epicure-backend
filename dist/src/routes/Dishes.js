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
const express_1 = __importDefault(require("express"));
const Dish_1 = require("./models/Dish");
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const Restaurant_1 = require("./models/Restaurant");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dishes = yield Dish_1.Dish.find().populate("restaurant", "name");
    res.send(dishes);
}));
router.get("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dish = yield Dish_1.Dish.findById(req.params.id).populate("restaurant", "name");
    if (!dish)
        return res.status(404).send("The dish with the given ID was not found.");
    res.send(dish);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Dish_1.validateDish)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const dish = new Dish_1.Dish({
            name: req.body.name,
            price: req.body.price,
            ingredients: req.body.ingredients || [],
            tags: req.body.tags || [],
            restaurant: req.body.restaurant,
        });
        const savedDish = yield dish.save();
        if (req.body.restaurant) {
            try {
                const restaurant = yield Restaurant_1.Restaurant.findById(req.body.restaurant);
                if (restaurant) {
                    restaurant.dishes.push(savedDish._id);
                    yield restaurant.save();
                }
            }
            catch (err) {
                console.error(`Error updating restaurant with ID ${req.body.restaurant}:`, err);
            }
        }
        res.status(201).send(savedDish);
    }
    catch (err) {
        res.status(500).send("Failed to create dish. Please try again later.");
    }
}));
router.put("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Dish_1.validateDish)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const dish = yield Dish_1.Dish.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        price: req.body.price,
        ingredients: req.body.ingredients,
        tags: req.body.tags,
        restaurant: req.body.restaurant,
    }, { new: true });
    if (!dish)
        return res.status(404).send("The dish with the given ID was not found.");
    res.send(dish);
}));
router.delete("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dish = yield Dish_1.Dish.findByIdAndUpdate(req.params.id, { status: "deprecated" }, { new: true });
    if (!dish)
        return res.status(404).send("The dish with the given ID was not found.");
    res.send(dish);
}));
exports.default = router;
