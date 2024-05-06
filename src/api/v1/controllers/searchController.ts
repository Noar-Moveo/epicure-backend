import { Request, Response } from "express";
import { searchHandler } from "../handlers/searchHandler";

export const searchController = async (req: Request, res: Response) => {
  try {
    await searchHandler(req, res);
  } catch (error) {
    console.error("Error occurred in search handler:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
