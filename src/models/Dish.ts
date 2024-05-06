import mongoose from "mongoose";
import Joi from "joi";

interface DishType {
  name: string;
  price: number;
  ingredients: string[];
  tags: string[];
  status: string;
  restaurant: mongoose.Types.ObjectId;
}

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number },
  ingredients: [{ type: String }],
  tags: [{ type: String }],
  status: {
    type: String,
    enum: ["active", "deprecated"],
    default: "active",
  },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

const Dish = mongoose.model("Dish", dishSchema);

function validateDish(dish: DishType) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    price: Joi.number().min(0),
    ingredients: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    status: Joi.string().valid("active", "deprecated"),
    restaurant: Joi.objectId(),
  });

  return schema.validate(dish);
}

export { Dish, validateDish };
