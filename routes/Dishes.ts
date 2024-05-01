import express from 'express';
import mongoose from 'mongoose';
import { Dish, validateDish } from '../models/Dish';
import validateObjectId from '../middleware/validateObjectId';
import { Restaurant } from '../models/Restaurant'


const router = express.Router();

router.get('/', async (req, res) => {
  const dishes = await Dish.find().populate('restaurant', 'name');
  res.send(dishes);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const dish = await Dish.findById(req.params.id).populate('restaurant', 'name');

  if (!dish) return res.status(404).send('The dish with the given ID was not found.');
  res.send(dish);
});

router.post('/', async (req, res) => {
  const { error } = validateDish(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const dish = new Dish({
      name: req.body.name,
      price: req.body.price,
      ingredients: req.body.ingredients || [], 
      tags: req.body.tags || [],
      restaurant: req.body.restaurant 
    });

    const savedDish = await dish.save();

    if (req.body.restaurant) {
      try {
        const restaurant = await Restaurant.findById(req.body.restaurant);
        if (restaurant) {
          restaurant.dishes.push(savedDish._id);
          await restaurant.save();
        }
      } catch (err) {
        console.error(`Error updating restaurant with ID ${req.body.restaurant}:`, err);
      }
    }

    res.status(201).send(savedDish); 
  } catch (err) {
    res.status(500).send('Failed to create dish. Please try again later.');
  }
});



router.put('/:id', validateObjectId, async (req, res) => {
  const { error } = validateDish(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const dish = await Dish.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    price: req.body.price,
    ingredients: req.body.ingredients,
    tags: req.body.tags,
    restaurant: req.body.restaurant
  }, { new: true });

  if (!dish) return res.status(404).send('The dish with the given ID was not found.');

  res.send(dish);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const dish = await Dish.findByIdAndDelete(req.params.id);

  if (!dish) return res.status(404).send('The dish with the given ID was not found.');

  res.send(dish);
});

export default router;
