import { Chef, validateChef } from "../../../models/Chef";
import { Restaurant } from "../../../models/Restaurant";

export async function getAllChefs(skip: number, limit: number) {
  const chefs = await Chef.aggregate([
    { $match: { status: "active" } },
    { $sort: { _id: 1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "restaurants",
        localField: "restaurants",
        foreignField: "_id",
        as: "restaurants",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        image: 1,
        description: 1,
        restaurants: { $arrayElemAt: ["$restaurants.name", 0] },
      },
    },
  ]);
  return chefs;
}

export async function getChefById(id: string) {
  const chef = await Chef.findById(id).populate("restaurants", "name");
  if (!chef) {
    throw new Error("The chef with the given ID was not found.");
  }

  if (chef.status === "deprecated") {
    throw new Error("The chef is deprecated.");
  }
  return chef;
}

export async function createChef(chefData: any) {
  try {
    const { error } = validateChef(chefData);
    if (error) throw new Error(error.details[0].message);

    if (chefData.restaurants && chefData.restaurants.length > 0) {
      for (const restaurantId of chefData.restaurants) {
        const restaurant = await Restaurant.findOne({
          _id: restaurantId,
          status: "active",
        });
        if (!restaurant) {
          throw new Error(
            `The restaurant with ID ${restaurantId} does not exist.`
          );
        }
      }
    }

    const chef = new Chef({
      name: chefData.name,
      image: chefData.image,
      description: chefData.description,
      status: "active",
      restaurants: chefData.restaurants || [],
    });

    const savedChef = await chef.save();

    if (chefData.restaurants && chefData.restaurants.length > 0) {
      await Promise.all(
        chefData.restaurants.map(async (restaurantId: string) => {
          const restaurant = await Restaurant.findById(restaurantId);
          if (restaurant) {
            restaurant.chef = savedChef._id;
            await restaurant.save();
          }
        })
      );
    }

    return savedChef;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function updateChefById(id: string, chefData: any) {
  const { error } = validateChef(chefData);
  if (error) throw new Error(error.details[0].message);

  if (chefData.restaurants && chefData.restaurants.length > 0) {
    const invalidRestaurantIds: string[] = [];
    for (const restaurantId of chefData.restaurants) {
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        invalidRestaurantIds.push(restaurantId);
      } else {
        if (restaurant.status === "deprecated") {
          throw new Error("The restaurant is deprecated.");
        }
      }
    }
    if (invalidRestaurantIds.length > 0) {
      throw new Error(
        `The following restaurants do not exist: ${invalidRestaurantIds.join(
          ", "
        )}`
      );
    }
  }

  const chef = await Chef.findByIdAndUpdate(
    id,
    {
      name: chefData.name,
      image: chefData.image,
      description: chefData.description,
      status: chefData.status,
      restaurants: chefData.restaurants,
    },
    { new: true }
  );

  return chef;
}

export async function deleteChefById(id: string) {
  try {
    const chef = await Chef.findById(id);
    if (!chef) {
      throw new Error("Chef not found.");
    }

    chef.status = "deprecated";
    await chef.save();

    // const restaurants = await Restaurant.find({ chef: id });

    // await Promise.all(
    //   restaurants.map(async (restaurant) => {
    //     restaurant.status = "deprecated";
    //     await restaurant.save();
    //   })
    // );

    return chef;
  } catch (error) {
    throw new Error("Error deleting chef.");
  }
}

export async function activateChefById(id: string) {
  const chef = await Chef.findById(id);
  if (!chef) {
    throw new Error("Dish not found.");
  }

  if (chef.status !== "deprecated") {
    throw new Error("Restaurant is not deprecated.");
  }

  chef.status = "active";
  await chef.save();
}
