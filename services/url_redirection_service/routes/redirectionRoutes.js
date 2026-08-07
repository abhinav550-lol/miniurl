import express from 'express'
import {redirectionController} from "../controllers/redirectionController.js";
const router = express.Router();

router.get('/:shortCode' , redirectionController.redirectUsingShortCode);

export default router;
