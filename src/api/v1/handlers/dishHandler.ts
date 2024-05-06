import { Dish, validateDish } from "../../../models/Dish";
import { Restaurant } from "../../../models/Restaurant";


export async function getAllDishes(page: number, perPage: number) {
  const skip = (page - 1) * perPage;
  const dishes = await Dish.find({ status: "active" })
    .populate("restaurant", "name")
    .skip(skip)
    .limit(perPage);
  return dishes;
}


export async function getDishById(id: string) {
  const dish = await Dish.findById(id).populate("restaurant", "name");
  if (!dish) {
    throw new Error("The dish with the given ID was not found.");
  }

  if (dish.status === "deprecated") {
    throw new Error("The dish is deprecated.");
  }
  return dish;
}

export async function createDish(dishData: any) {
  try {
    const { error } = validateDish(dishData);
    if (error) throw new Error(error.details[0].message);

    if (dishData.restaurant) {
      const existingRestaurant = await Restaurant.findOne({
        _id: dishData.restaurant,
        status: "active",
      });
      if (!existingRestaurant) {
        throw new Error(
          `The restaurant with ID ${dishData.restaurant} does not exist.`
        );
      }
    }

    const dish = new Dish({
      name: dishData.name,
      price: dishData.price,
      ingredients: dishData.ingredients || [],
      tags: dishData.tags || [],
      restaurant: dishData.restaurant,
    });

    const savedDish = await dish.save();

    console.log("Dish created:", savedDish);

    if (dishData.restaurant) {
      const restaurant = await Restaurant.findById(dishData.restaurant);
      if (restaurant) {
        restaurant.dishes.push(savedDish._id);
        await restaurant.save();
      }
    }

    return savedDish;
  } catch (err) {
    if (err.message.startsWith("The restaurant with ID")) {
      throw new Error(err.message);
    } else {
      throw new Error("Failed to create dish. " + err.message);
    }
  }
}

export async function updateDishById(id: string, dishData: any) {
  try {
    const { error } = validateDish(dishData);
    if (error) throw new Error(error.details[0].message);

    const dish = await Dish.findById(id);
    if (!dish) {
      throw new Error("Dish not found.");
    }

    const isStatusChangingToActive =
      dish.status === "deprecated" && dishData.status === "active";

    dish.name = dishData.name;
    dish.price = dishData.price;
    dish.ingredients = dishData.ingredients;
    dish.tags = dishData.tags;
    dish.status = dishData.status;
    dish.restaurant = dishData.restaurant;

    await dish.save();

    if (isStatusChangingToActive && dish.restaurant) {
      const restaurant = await Restaurant.findById(dish.restaurant);
      if (restaurant) {
        restaurant.dishes.push(dish._id);
        await restaurant.save();
      }
    }

    return dish;
  } catch (error) {
    throw new Error("Error updating dish.");
  }
}


export async function deleteDishById(id: string) {
  try {
    const dish = await Dish.findById(id);
    if (!dish) {
      throw new Error("Dish not found.");
    }

    dish.status = "deprecated";
    await dish.save();

    const restaurant = await Restaurant.findOne({ dishes: id });
    if (restaurant) {
      restaurant.dishes = restaurant.dishes.filter(
        (dishId) => dishId.toString() !== id
      );
      await restaurant.save();
    }

    return dish;
  } catch (error) {
    throw new Error("Error deleting dish.");
  }
}

export async function activateDishById(id: string) {
  const dish = await Dish.findById(id);
  if (!dish) {
    throw new Error("Dish not found.");
  }

  if (dish.status !== "deprecated") {
    throw new Error("Restaurant is not deprecated.");
  }

  dish.status = "active";
  await dish.save();
}