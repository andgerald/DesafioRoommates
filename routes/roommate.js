import { Router } from "express";
import { roommatesController } from "../controllers/roommates.js";

const router = Router();

router.post("/roommate", roommatesController.create);

export default router;
