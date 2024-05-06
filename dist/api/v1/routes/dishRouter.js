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
const dishController = __importStar(require("../controllers/dishController"));
const validateObjectId_1 = __importDefault(require("../../../middleware/validateObjectId"));
const router = express_1.default.Router();
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
router.get("/:id", validateObjectId_1.default, dishController.getDishById);
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
router.put("/:id", validateObjectId_1.default, dishController.updateDishById);
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
router.delete("/:id", validateObjectId_1.default, dishController.deleteDishById);
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
router.put("/:id/activate", validateObjectId_1.default, dishController.activateDishById);
exports.default = router;
