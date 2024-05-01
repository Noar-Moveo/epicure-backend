"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDish = exports.Dish = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const dishSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    price: { type: Number },
    ingredients: [{ type: String }],
    tags: [{ type: String }],
    restaurant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Restaurant' }
});
const Dish = mongoose_1.default.model('Dish', dishSchema);
exports.Dish = Dish;
function validateDish(dish) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().trim().min(1).max(50).required(),
        price: joi_1.default.number().min(0),
        ingredients: joi_1.default.array().items(joi_1.default.string().required()),
        tags: joi_1.default.array().items(joi_1.default.string()),
        restaurant: joi_1.default.objectId()
    });
    return schema.validate(dish);
}
exports.validateDish = validateDish;
