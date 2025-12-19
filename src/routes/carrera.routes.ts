import { Router } from "express";
import * as carreraController from "../controllers/carrera.controller";

const router = Router();

router.get("/", carreraController.listarCarreras);
router.get("/:id", carreraController.obtenerCarrera);
router.post("/", carreraController.crearCarrera);
router.put("/:id", carreraController.actualizarCarrera);
router.delete("/:id", carreraController.eliminarCarrera);

export default router;
