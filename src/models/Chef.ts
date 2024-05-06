import mongoose from "mongoose";
import Joi from "joi";

Joi.objectId = require("joi-objectid")(Joi);

interface ChefType {
  name: string;
  image: string;
  description: string;
  status: string;
  restaurants: mongoose.Types.ObjectId[];
}

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "deprecated"],
    default: "active",
  },
  restaurants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
});

const Chef = mongoose.model("Chef", chefSchema);

function validateChef(chef: ChefType) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    image: Joi.string(),
    description: Joi.string(),
    status: Joi.string().valid("active", "deprecated"),
    restaurants: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(chef);
}

export { Chef, validateChef };
