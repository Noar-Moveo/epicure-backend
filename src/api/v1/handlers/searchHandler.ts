import { Request, Response } from "express";
import { search } from "../controllers/searchController";

export const searchHandler = async (req: Request, res: Response) => {
  try {
    await search(req, res);
  } catch (error) {
    console.error("Error occurred in search handler:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
