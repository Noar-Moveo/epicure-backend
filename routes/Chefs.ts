import express from "express";
import { Chef, validateChef } from "../models/Chef";
import validateObjectId from "../middleware/validateObjectId";
import { Restaurant } from "../models/Restaurant";
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("GET request receives");
  const chefs = await Chef.find().populate("restaurants", "name");
  res.send(chefs);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const chef = await Chef.findById(req.params.id).populate(
    "restaurants",
    "name"
  );

  if (!chef)
    return res.status(404).send("The chef with the given ID was not found.");
  res.send(chef);
});

router.post("/", async (req, res) => {
  console.log("Received POST request to create chef:", req.body);
  const { error } = validateChef(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const chef = new Chef({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      restaurants: req.body.restaurants || [],
    });

    const savedChef = await chef.save();

    if (req.body.restaurants && req.body.restaurants.length > 0) {
      await Promise.all(
        req.body.restaurants.map(async (restaurantId: string) => {
          const restaurant = await Restaurant.findById(restaurantId);
          if (restaurant) {
            restaurant.chef = savedChef._id;
            await restaurant.save();
          }
        })
      );
    }

    res.status(201).send(savedChef);
  } catch (err) {
    res.status(500).send("Failed to create chef. Please try again later.");
  }
});

router.put("/:id", validateObjectId, async (req, res) => {
  const { error } = validateChef(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const chef = await Chef.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      restaurants: req.body.restaurants,
    },
    { new: true }
  );

  if (!chef)
    return res.status(404).send("The chef with the given ID was not found.");

  res.send(chef);
});

router.delete(":id", validateObjectId, async (req, res) => {
  const chef = await Chef.findByIdAndDelete(req.params.id);

  if (!chef)
    return res.status(404).send("The chef with the given ID was not found.");

  res.send(chef);
});

export default router;
