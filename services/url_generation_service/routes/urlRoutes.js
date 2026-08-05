import express from "express";
import {isLoggedIn} from "../middleware/authMiddlewares.js";
import {urlController} from "../controllers/urlController.js";
import {validate} from "../middleware/validateMiddleware.js";
import {urlValidator} from "../validators/urlValidator.js";
const router = express.Router();

// Create short URL (auto-generated)
router.post("/" , isLoggedIn , validate(urlValidator.createShortURLSchema) ,urlController.createShortURL);

// Get all URLs
router.get("/" , isLoggedIn , urlController.getUserShortURLs);

// Upsert short URL with custom alias
router.post("/:shortCode/custom" , isLoggedIn , validate(urlValidator.upsertCustomAliasSchema) ,urlController.upsertCustomAlias);

// Get details of one URL
router.get("/:shortCode" , isLoggedIn , validate(urlValidator.getShortURLDetailsSchema) ,urlController.getShortURLDetails);

// Update destination URL
router.patch("/:shortCode" , isLoggedIn , validate(urlValidator.updateLongURLSchema) ,urlController.updateLongURL);

// Delete URL
router.delete("/:shortCode" , isLoggedIn , validate(urlValidator.deleteShortURLSchema) ,urlController.deleteShortURL);

export default router;