import { Router } from "express";
import * as profesorController from "../controllers/profesor.controller";

const router = Router();

router.get("/", profesorController.listarProfesores);
router.get("/:id", profesorController.obtenerProfesor);
router.post("/", profesorController.crearProfesor);
router.put("/:id", profesorController.actualizarProfesor);
router.delete("/:id", profesorController.eliminarProfesor);

export default router;
