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
const chefController = __importStar(require("../controllers/chefController"));
const validateObjectId_1 = __importDefault(require("../../../middleware/validateObjectId"));
const router = express_1.default.Router();
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
router.get("/:id", validateObjectId_1.default, chefController.getChefById);
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
router.put("/:id", validateObjectId_1.default, chefController.updateChefById);
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
router.delete("/:id", validateObjectId_1.default, chefController.deleteChefById);
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
router.put("/:id/activate", validateObjectId_1.default, chefController.activateChefById);
exports.default = router;
