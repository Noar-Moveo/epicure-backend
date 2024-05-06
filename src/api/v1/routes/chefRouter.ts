import express from "express";
import * as chefController from "../controllers/chefController";
import validateObjectId from "../../../middleware/validateObjectId";

const router = express.Router();

/**
 * @openapi
 * /chefs:
 *   get:
 *     summary: Get all chefs
 *     description: Retrieves a list of all chefs from the database.
 *     responses:
 *       200:
 *         description: An array of chef objects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chef'
 */
router.get("/", chefController.getAllChefs);

/**
 * @openapi
 * /chefs/{id}:
 *   get:
 *     summary: Get a chef by ID
 *     description: Retrieves a single chef by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the chef
 *     responses:
 *       200:
 *         description: A single chef object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chef'
 *       404:
 *         description: Chef not found.
 */
router.get("/:id", validateObjectId, chefController.getChefById);

/**
 * @openapi
 * /chefs:
 *   post:
 *     summary: Create a new chef
 *     description: Adds a new chef to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chef'
 *     responses:
 *       201:
 *         description: Chef created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chef'
 */
router.post("/", chefController.createChef);

/**
 * @openapi
 * /chefs/{id}:
 *   put:
 *     summary: Update a chef
 *     description: Updates an existing chef by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the chef
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Chef'
 *     responses:
 *       200:
 *         description: Chef updated successfully.
 */
router.put("/:id", validateObjectId, chefController.updateChefById);

/**
 * @openapi
 * /chefs/{id}:
 *   delete:
 *     summary: Delete a chef
 *     description: Removes a chef from the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the chef
 *     responses:
 *       204:
 *         description: Chef deleted successfully.
 */
router.delete("/:id", validateObjectId, chefController.deleteChefById);

/**
 * @openapi
 * /chefs/{id}/activate:
 *   put:
 *     summary: Activate a chef
 *     description: Marks a chef as active in the database by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The unique identifier of the chef
 *     responses:
 *       200:
 *         description: Chef activated successfully.
 */
router.put("/:id/activate", validateObjectId, chefController.activateChefById);

export default router;
