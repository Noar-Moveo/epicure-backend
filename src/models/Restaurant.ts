import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

declare module "joi" {
  interface Root {
    objectId(): any;
  }
}

Joi.objectId = JoiObjectId(Joi);

interface RestaurantType {
  name: string;
  image: string;
  chef: mongoose.Types.ObjectId;
  status: string;
  dishes: mongoose.Types.ObjectId[];
}

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: { type: String },
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chef",
    require: true,
  },
  status: {
    type: String,
    enum: ["active", "deprecated"],
    default: "active",
  },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

function validateRestaurant(restaurant: RestaurantType) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    image: Joi.string(),
    chef: Joi.objectId().required(),
    status: Joi.string().valid("active", "deprecated"),
    dishes: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(restaurant);
}

export { Restaurant, validateRestaurant };
