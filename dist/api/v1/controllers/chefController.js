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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activateChefById = exports.deleteChefById = exports.updateChefById = exports.createChef = exports.getChefById = exports.getAllChefs = void 0;
const chefHandler = __importStar(require("../handlers/chefHandler"));
function getAllChefs(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10;
            const skip = (page - 1) * perPage;
            const chefs = yield chefHandler.getAllChefs(skip, perPage);
            res.send(chefs);
        }
        catch (error) {
            console.error('Error fetching chefs:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getAllChefs = getAllChefs;
function getChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const chef = yield chefHandler.getChefById(id);
            if (!chef) {
                return res.status(404).send('The chef with the given ID was not found.');
            }
            res.send(chef);
        }
        catch (error) {
            console.error('Error fetching chef:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.getChefById = getChefById;
function createChef(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chef = yield chefHandler.createChef(req.body);
            res.status(201).send(chef);
        }
        catch (error) {
            console.error('Failed to create chef:', error);
            res.status(500).send('Failed to create chef. Please try again later.');
        }
    });
}
exports.createChef = createChef;
function updateChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const updatedChef = yield chefHandler.updateChefById(id, req.body);
            if (!updatedChef) {
                return res.status(404).send('The chef with the given ID was not found.');
            }
            res.send(updatedChef);
        }
        catch (error) {
            console.error('Error updating chef:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.updateChefById = updateChefById;
function deleteChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const deletedChef = yield chefHandler.deleteChefById(id);
            if (!deletedChef) {
                return res.status(404).send('The chef with the given ID was not found.');
            }
            res.send(deletedChef);
        }
        catch (error) {
            console.error('Error deleting chef:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
exports.deleteChefById = deleteChefById;
function activateChefById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield chefHandler.activateChefById(id);
            res.json({ message: "Chef activated successfully." });
        }
        catch (error) {
            console.error("Error activating chef:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });
}
exports.activateChefById = activateChefById;