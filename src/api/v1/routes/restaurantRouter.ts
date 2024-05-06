import express from "express";
import * as restaurantController from "../controllers/restaurantController";
import validateObjectId from "../../../middleware/validateObjectId";

const router = express.Router();

/**
 * @openapi
 * /restaurants:
 *   get:
 *     summary: Get all restaurants
 *     description: Retrieves a list of all restaurants from the database.
 *     responses:
 *       200:
 *         description: An array of restaurant objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Restaurant'
 */
router.get("/", restaurantController.getAllRestaurants);

/**
 * @openapi
 * /restaurants/{id}:
 *   get:
 *     summary: Get a restaurant by ID
 *     description: Retrieves a single restaurant by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the restaurant
 *     responses:
 *       200:
 *         description: A single restaurant object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 *       404:
 *         description: Restaurant not found.
 */
router.get("/:id", validateObjectId, restaurantController.getRestaurantById);

/**
 * @openapi
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     description: Adds a new restaurant to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       201:
 *         description: Restaurant created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurant'
 */
router.post("/", restaurantController.createRestaurant);

/**
 * @openapi
 * /restaurants/{id}:
 *   put:
 *     summary: Update a restaurant
 *     description: Updates an existing restaurant by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the restaurant
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Restaurant'
 *     responses:
 *       200:
 *         description: Restaurant updated successfully.
 */
router.put("/:id", validateObjectId, restaurantController.updateRestaurantById);

/**
 * @openapi
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant
 *     description: Removes a restaurant from the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the restaurant
 *     responses:
 *       204:
 *         description: Restaurant deleted successfully.
 */
router.delete(
  "/:id",
  validateObjectId,
  restaurantController.deleteRestaurantById
);

/**
 * @openapi
 * /restaurants/{id}/activate:
 *   put:
 *     summary: Activate a restaurant
 *     description: Marks a restaurant as active in the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the restaurant
 *     responses:
 *       200:
 *         description: Restaurant activated successfully.
 */
router.put(
  "/:id/activate",
  validateObjectId,
  restaurantController.activateRestaurantById
);

export default router;
