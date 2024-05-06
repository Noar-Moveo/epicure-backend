import { Request, Response } from "express";
import { Chef } from "../../../models/Chef";
import { Restaurant } from "../.././../models/Restaurant";
import { Dish } from "../../../models/Dish";

export const searchHandler = async (req: Request, res: Response) => {
  try {
    const searchQuery: string = req.query.q ? (req.query.q as string) : "";

    const [chefs, restaurants, dishes] = await Promise.all([
      Chef.find({
        name: { $regex: searchQuery, $options: "i" },
        status: "active",
      }),
      Restaurant.find({
        name: { $regex: searchQuery, $options: "i" },
        status: "active",
      }),
      Dish.find({
        name: { $regex: searchQuery, $options: "i" },
        status: "active",
      }),
    ]);

    res.json({ chefs, restaurants, dishes });
  } catch (error) {
    console.error("Error occurred during search:", error);
    res.status(500).json({ error: "An error occurred during search" });
  }
};
