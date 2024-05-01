import mongoose from "mongoose";
import Joi from "joi";
import JoiObjectId from "joi-objectid";

declare module "joi" {
  interface Root {
    objectId(): any;
  }
}

Joi.objectId = JoiObjectId(Joi);

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
  },
  dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

interface RestaurantType {
  name: string;
  image: string;
  chef: mongoose.Types.ObjectId;
  dishes: mongoose.Types.ObjectId[];
}

function validateRestaurant(restaurant: RestaurantType) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    image: Joi.string(),
    chef: Joi.objectId(),
    dishes: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(restaurant);
}

export { Restaurant, validateRestaurant };
