"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantController = __importStar(require("../controllers/restaurantController"));
const validateObjectId_1 = __importDefault(require("../../../middleware/validateObjectId"));
const router = express_1.default.Router();
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
router.get("/:id", validateObjectId_1.default, restaurantController.getRestaurantById);
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
router.put("/:id", validateObjectId_1.default, restaurantController.updateRestaurantById);
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
router.delete("/:id", validateObjectId_1.default, restaurantController.deleteRestaurantById);
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
router.put("/:id/activate", validateObjectId_1.default, restaurantController.activateRestaurantById);
exports.default = router;
