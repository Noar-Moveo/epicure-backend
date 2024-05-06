import { Restaurant, validateRestaurant } from "../../../models/Restaurant";
import { Chef } from "../../../models/Chef";
import { Dish } from "../../../models/Dish";


export async function getAllRestaurants(page: number, perPage: number) {
  const skip = (page - 1) * perPage;
  const restaurants = await Restaurant.find({ status: "active" })
    .populate("chef", "name")
    .populate("dishes")
    .skip(skip)
    .limit(perPage);
  return restaurants;
}

export async function getRestaurantById(id: string) {
  const restaurant = await Restaurant.findById(id)
    .populate("chef", "name")
    .populate("dishes");
  if (!restaurant) {
    throw new Error("The restaurant with the given ID was not found.");
  }

  if (restaurant.status === "deprecated") {
    throw new Error("The restaurant is deprecated.");
  }

  return restaurant;
}

export async function createRestaurant(restaurantData: any) {
  try {
    const { error } = validateRestaurant(restaurantData);
    if (error) throw new Error(error.details[0].message);

    const chef = await Chef.findOne({
      _id: restaurantData.chef,
      status: "active",
    });
    if (!chef) {
      throw new Error("The chef with the provided ID does not exist.");
    }

    if (restaurantData.dishes && restaurantData.dishes.length > 0) {
      for (const dishId of restaurantData.dishes) {
        const dish = await Dish.findOne({ _id: dishId, status: "active" });
        if (!dish) {
          throw new Error(`The dish with ID ${dishId} does not exist.`);
        }
      }
    }

    const restaurant = new Restaurant({
      name: restaurantData.name,
      image: restaurantData.image,
      chef: restaurantData.chef,
      dishes: restaurantData.dishes || [],
    });

    const savedRestaurant = await restaurant.save();

    chef.restaurants.push(savedRestaurant._id);
    await chef.save();

    if (restaurantData.dishes && restaurantData.dishes.length > 0) {
      await Promise.all(
        restaurantData.dishes.map(async (dishId: string) => {
          const dish = await Dish.findOne({ _id: dishId, status: "active" });
          if (dish) {
            dish.restaurant = savedRestaurant._id;
            await dish.save();
          }
        })
      );
    }

    return savedRestaurant;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateRestaurantById(id: string, restaurantData: any) {
  const isStatusChangedToActive =
    restaurantData.status === "active" &&
    restaurantData.status !== "deprecated";

  let restaurant;

  if (isStatusChangedToActive) {
    restaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        ...restaurantData,
      },
      { new: true }
    );

    const chef = await Chef.findById(restaurantData.chef);
    if (chef) {
      chef.restaurants.push(restaurant._id);
      await chef.save();
    }
  } else {
    restaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        ...restaurantData,
      },
      { new: true }
    );
  }

  return restaurant;
}

export async function deleteRestaurantById(id: string) {
  try {
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      throw new Error("Restaurant not found.");
    }

    console.log("Restaurant ID:", restaurant._id);

    restaurant.status = "deprecated";
    await restaurant.save();

    const chef = await Chef.findById(restaurant.chef);
    if (!chef) {
      throw new Error("Chef not found.");
    }

    console.log("Chef:", chef);
    console.log("Chef's Restaurants:", chef.restaurants);

    chef.restaurants = chef.restaurants.filter(
      (restId) => restId.toString() !== id.toString()
    );
    await chef.save();

    await Dish.updateMany({ restaurant: id }, { status: "deprecated" });

    return restaurant;
  } catch (error) {
    throw new Error("Error deleting restaurant.");
  }
}

export async function activateRestaurantById(id: string) {
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) {
    throw new Error("Restaurant not found.");
  }

  if (restaurant.status !== "deprecated") {
    throw new Error("Restaurant is not deprecated.");
  }

  restaurant.status = "active";
  await restaurant.save();
}
