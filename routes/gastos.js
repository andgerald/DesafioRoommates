import { Router } from "express";
import { gastosController } from "../controllers/gastos.js";

const router = Router();

router.get("/gastos", gastosController.findAll);

export default router;
