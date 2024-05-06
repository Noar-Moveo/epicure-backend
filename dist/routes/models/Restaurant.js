"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestaurant = exports.Restaurant = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const joi_objectid_1 = __importDefault(require("joi-objectid"));
joi_1.default.objectId = (0, joi_objectid_1.default)(joi_1.default);
const restaurantSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: { type: String },
    chef: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Chef",
    },
    status: {
        type: String,
        enum: ["active", "deprecated"],
        default: "active",
    },
    dishes: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Dish" }],
});
const Restaurant = mongoose_1.default.model("Restaurant", restaurantSchema);
exports.Restaurant = Restaurant;
function validateRestaurant(restaurant) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().trim().min(1).max(50).required(),
        image: joi_1.default.string(),
        chef: joi_1.default.objectId(),
        status: joi_1.default.string().valid("active", "deprecated"),
        dishes: joi_1.default.array().items(joi_1.default.objectId()),
    });
    return schema.validate(restaurant);
}
exports.validateRestaurant = validateRestaurant;
