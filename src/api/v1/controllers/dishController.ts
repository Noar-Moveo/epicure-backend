import { Request, Response } from "express";
import * as dishHandler from "../handlers/dishHandler";


export async function getAllDishes(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const dishes = await dishHandler.getAllDishes(page, perPage);
    res.send(dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function getDishById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const dish = await dishHandler.getDishById(id);
    if (!dish) {
      return res.status(404).send("The dish with the given ID was not found.");
    }
    res.send(dish);
  } catch (error) {
    console.error("Error fetching dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function createDish(req: Request, res: Response) {
  try {
    const dish = await dishHandler.createDish(req.body);
    res.status(201).send(dish);
  } catch (error) {
    console.error("Failed to create dish:", error);
    res.status(500).send("Failed to create dish. Please try again later.");
  }
}

export async function updateDishById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedDish = await dishHandler.updateDishById(id, req.body);
    if (!updatedDish) {
      return res.status(404).send("The dish with the given ID was not found.");
    }
    res.send(updatedDish);
  } catch (error) {
    console.error("Error updating dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function deleteDishById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedDish = await dishHandler.deleteDishById(id);
    if (!deletedDish) {
      return res.status(404).send("The dish with the given ID was not found.");
    }
    res.send(deletedDish);
  } catch (error) {
    console.error("Error deleting dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function activateDishById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await dishHandler.activateDishById(id);
    res.json({ message: "Dish activated successfully." });
  } catch (error) {
    console.error("Error activating dish:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
