import express from "express";
import * as dishController from "../controllers/dishController";
import validateObjectId from "../../../middleware/validateObjectId";

const router = express.Router();

/**
 * @openapi
 * /dishes:
 *   get:
 *     summary: Get all dishes
 *     description: Retrieves a list of all dishes from the database.
 *     responses:
 *       200:
 *         description: An array of dishes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dish'
 */
router.get("/", dishController.getAllDishes);

/**
 * @openapi
 * /dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     description: Retrieves a single dish by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single dish object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dish'
 *       404:
 *         description: Dish not found.
 */
router.get("/:id", validateObjectId, dishController.getDishById);

/**
 * @openapi
 * /dishes:
 *   post:
 *     summary: Create a new dish
 *     description: Adds a new dish to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       201:
 *         description: Dish created successfully.
 */
router.post("/", dishController.createDish);

/**
 * @openapi
 * /dishes/{id}:
 *   put:
 *     summary: Update a dish
 *     description: Updates an existing dish by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Dish'
 *     responses:
 *       200:
 *         description: Dish updated successfully.
 */
router.put("/:id", validateObjectId, dishController.updateDishById);

/**
 * @openapi
 * /dishes/{id}:
 *   delete:
 *     summary: Delete a dish
 *     description: Removes a dish from the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Dish deleted successfully.
 */
router.delete("/:id", validateObjectId, dishController.deleteDishById);

/**
 * @openapi
 * /dishes/{id}/activate:
 *   put:
 *     summary: Activate a dish
 *     description: Marks a dish as active in the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dish activated successfully.
 */
router.put("/:id/activate", validateObjectId, dishController.activateDishById);

export default router;
