import mongoose from 'mongoose';
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

const chefSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
});

const Chef = mongoose.model('Chef', chefSchema);

function validateChef(chef: any) {
  const schema = Joi.object({
    name: Joi.string().trim().min(1).max(50).required(),
    image: Joi.string(),
    description: Joi.string(),
    restaurants: Joi.array().items(Joi.objectId()) 
  });

  return schema.validate(chef);
}

export { Chef, validateChef };
