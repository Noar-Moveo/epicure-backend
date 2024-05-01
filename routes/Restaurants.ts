import validateObjectId from '../middleware/validateObjectId';
import express from 'express';
import { Chef } from '../models/Chef';
import { Dish } from '../models/Dish'
import { Restaurant, validateRestaurant } from '../models/Restaurant'; 


const router = express.Router();

router.get('/', async (req, res) => {
  const restaurants = await Restaurant.find().populate('chef', 'name').populate('dishes');
  res.send(restaurants);
});

router.get('/:id', validateObjectId, async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate('chef', 'name').populate('dishes');

  if (!restaurant) return res.status(404).send('The restaurant with the given ID was not found.');
  res.send(restaurant);
});

router.post('/', async (req, res) => {
  const { error } = validateRestaurant(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const restaurant = new Restaurant({
      name: req.body.name,
      image: req.body.image,
      chef: req.body.chef, 
      dishes: req.body.dishes || [] 
    });

    const savedRestaurant = await restaurant.save();

    if (req.body.dishes && req.body.dishes.length > 0) {
      await Promise.all(req.body.dishes.map(async (dishId: String) => {
        try {
          const dish = await Dish.findById(dishId);
          if (dish) {
            dish.restaurant = savedRestaurant._id;
            await dish.save();
          }
        } catch (err) {
          console.error(`Error updating dish with ID ${dishId}:`, err);
        }
      }));
    }

    if (req.body.chef) {
      try {
        const chef = await Chef.findById(req.body.chef);
        if (chef) {
          chef.restaurants.push(savedRestaurant._id);
          await chef.save();
        }
      } catch (err) {
        console.error(`Error updating chef with ID ${req.body.chef}:`, err);
      }
    }

    res.status(201).send(savedRestaurant); 
  } catch (err) {
    res.status(500).send('Failed to create restaurant. Please try again later.');
  }
});


router.put('/:id', validateObjectId, async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { 
    name: req.body.name,
    image: req.body.image,
    chef: req.body.chef,
    dishes: req.body.dishes
  }, { new: true });

  if (!restaurant) return res.status(404).send('The restaurant with the given ID was not found.');
  
  res.send(restaurant);
});

router.delete('/:id', validateObjectId, async (req, res) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (!restaurant) return res.status(404).send('The restaurant with the given ID was not found.');

  res.send(restaurant);
});

export default router;
