import { Request, Response } from 'express';
import * as chefHandler from '../handlers/chefHandler';


export async function getAllChefs(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const perPage = parseInt(req.query.perPage as string) || 10;
    const skip = (page - 1) * perPage;
    const chefs = await chefHandler.getAllChefs(skip, perPage);
    res.send(chefs);
  } catch (error) {
    console.error('Error fetching chefs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getChefById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const chef = await chefHandler.getChefById(id);
    if (!chef) {
      return res.status(404).send('The chef with the given ID was not found.');
    }
    res.send(chef);
  } catch (error) {
    console.error('Error fetching chef:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function createChef(req: Request, res: Response) {
  try {
    const chef = await chefHandler.createChef(req.body);
    res.status(201).send(chef);
  } catch (error) {
    console.error('Failed to create chef:', error);
    res.status(500).send('Failed to create chef. Please try again later.');
  }
}

export async function updateChefById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedChef = await chefHandler.updateChefById(id, req.body);
    if (!updatedChef) {
      return res.status(404).send('The chef with the given ID was not found.');
    }
    res.send(updatedChef);
  } catch (error) {
    console.error('Error updating chef:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function deleteChefById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedChef = await chefHandler.deleteChefById(id);
    if (!deletedChef) {
      return res.status(404).send('The chef with the given ID was not found.');
    }
    res.send(deletedChef);
  } catch (error) {
    console.error('Error deleting chef:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function activateChefById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await chefHandler.activateChefById(id);
    res.json({ message: "Chef activated successfully." });
  } catch (error) {
    console.error("Error activating chef:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
