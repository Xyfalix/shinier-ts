import express, { Router } from "express";
import { getAllItems, addItem } from "../../controllers/api/items";
import { checkToken, checkAdminRole } from "../../config/checkToken";

const router: Router = express.Router();

router.get("/", checkToken, checkAdminRole, getAllItems);
router.post("/", checkToken, checkAdminRole, addItem);

export default router;
