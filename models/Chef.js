"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateChef = exports.Chef = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
joi_1.default.objectId = require('joi-objectid')(joi_1.default);
const chefSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    restaurants: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Restaurant'
        }]
});
const Chef = mongoose_1.default.model('Chef', chefSchema);
exports.Chef = Chef;
function validateChef(chef) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().trim().min(1).max(50).required(),
        image: joi_1.default.string(),
        description: joi_1.default.string(),
        restaurants: joi_1.default.array().items(joi_1.default.objectId())
    });
    return schema.validate(chef);
}
exports.validateChef = validateChef;
