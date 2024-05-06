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
const Chef_1 = require("./models/Chef");
const validateObjectId_1 = __importDefault(require("../../middleware/validateObjectId"));
const Restaurant_1 = require("./models/Restaurant");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET request receives");
    const chefs = yield Chef_1.Chef.find().populate("restaurants", "name");
    res.send(chefs);
}));
router.get("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chef = yield Chef_1.Chef.findById(req.params.id).populate("restaurants", "name");
    if (!chef)
        return res.status(404).send("The chef with the given ID was not found.");
    res.send(chef);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Received POST request to create chef:", req.body);
    const { error } = (0, Chef_1.validateChef)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const chef = new Chef_1.Chef({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            status: "active",
            restaurants: req.body.restaurants || [],
        });
        const savedChef = yield chef.save();
        if (req.body.restaurants && req.body.restaurants.length > 0) {
            yield Promise.all(req.body.restaurants.map((restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
                const restaurant = yield Restaurant_1.Restaurant.findById(restaurantId);
                if (restaurant) {
                    restaurant.chef = savedChef._id;
                    yield restaurant.save();
                }
            })));
        }
        res.status(201).send(savedChef);
    }
    catch (err) {
        res.status(500).send("Failed to create chef. Please try again later.");
    }
}));
router.put("/:id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = (0, Chef_1.validateChef)(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    const chef = yield Chef_1.Chef.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        restaurants: req.body.restaurants,
    }, { new: true });
    if (!chef)
        return res.status(404).send("The chef with the given ID was not found.");
    res.send(chef);
}));
router.delete(":id", validateObjectId_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chef = yield Chef_1.Chef.findByIdAndUpdate(req.params.id, { status: "deprecated" }, { new: true });
    if (!chef)
        return res.status(404).send("The chef with the given ID was not found.");
    res.send(chef);
}));
exports.default = router;
