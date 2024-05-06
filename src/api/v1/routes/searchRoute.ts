import express from "express";
import { searchHandler } from "../handlers/searchHandler";

const router = express.Router();

/**
 * @openapi
 * /search:
 *   get:
 *     summary: Search for chefs, restaurants, and dishes
 *     description: Searches for chefs, restaurants, and dishes based on the provided query string.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search query string.
 *     responses:
 *       200:
 *         description: Search results for chefs, restaurants, and dishes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chefs:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Chef'
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 *                 dishes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Dish'
 *       500:
 *         description: Internal server error.
 */
router.get("/", searchHandler);

export default router;
