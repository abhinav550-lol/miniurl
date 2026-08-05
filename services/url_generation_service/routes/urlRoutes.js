import express from "express";
import {isLoggedIn} from "../middleware/authMiddlewares.js";
const router = express.Router();


// Create short URL (auto-generated)
router.post("/" ,  );

// Get all URLs
router.get("/");

// Upsert short URL with custom alias
router.post("/:shortCode/custom");

// Get details of one URL
router.get("/:shortCode");

// Update destination URL
router.patch("/:shortCode");

// Delete URL
router.delete("/:shortCode");

export default router;