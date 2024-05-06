import { Request, Response } from "express";
import { Chef } from "../../../models/Chef";
import { Restaurant } from "../.././../models/Restaurant";
import { Dish } from "../../../models/Dish";

export const search = async (req: Request, res: Response) => {
  try {
    const searchQuery: string = req.query.q ? (req.query.q as string) : "";

    const chefs = await Chef.find({
      name: { $regex: searchQuery, $options: "i" },
      status: "active",
    });

    const restaurants = await Restaurant.find({
      name: { $regex: searchQuery, $options: "i" },
      status: "active",
    });

    const dishes = await Dish.find({
      name: { $regex: searchQuery, $options: "i" },
      status: "active",
    });

    res.json({ chefs, restaurants, dishes });
  } catch (error) {
    console.error("Error occurred during search:", error);
    res.status(500).json({ error: "An error occurred during search" });
  }
};
