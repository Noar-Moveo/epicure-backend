import { Request, Response } from "express";
import * as restaurantHandler from "../handlers/restaurantHandler";

export async function getAllRestaurants(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const restaurants = await restaurantHandler.getAllRestaurants(
      page,
      perPage
    );
    res.send(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getRestaurantById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const restaurant = await restaurantHandler.getRestaurantById(id);
    if (!restaurant) {
      return res
        .status(404)
        .send("The restaurant with the given ID was not found.");
    }
    res.send(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createRestaurant(req: Request, res: Response) {
  try {
    const restaurant = await restaurantHandler.createRestaurant(req.body);
    res.status(201).send(restaurant);
  } catch (error) {
    console.error("Failed to create restaurant:", error);
    res
      .status(500)
      .send("Failed to create restaurant. Please try again later.");
  }
}

export async function updateRestaurantById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedRestaurant = await restaurantHandler.updateRestaurantById(
      id,
      req.body
    );
    if (!updatedRestaurant) {
      return res
        .status(404)
        .send("The restaurant with the given ID was not found.");
    }
    res.send(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteRestaurantById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedRestaurant = await restaurantHandler.deleteRestaurantById(id);
    if (!deletedRestaurant) {
      return res
        .status(404)
        .send("The restaurant with the given ID was not found.");
    }
    res.send(deletedRestaurant);
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function activateRestaurantById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await restaurantHandler.activateRestaurantById(id);
    res.json({ message: "Restaurant activated successfully." });
  } catch (error) {
    console.error("Error activating restaurant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
