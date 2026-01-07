import { Router } from "express";
import * as profesorController from "../controllers/profesor.controller";
import { idSchema } from "../schemas/carrera.schemas";
import { validate } from "../middlewares/validate.middleware";
import { updateProfesorSchema } from "../schemas/profesor.schemas";

const router = Router();

router.get("/", 
    profesorController.listarProfesores);

router.get("/:id", 
    validate(idSchema, "params"), 
    profesorController.obtenerProfesor);

router.post("/", 
    validate(idSchema, "body"),
    profesorController.crearProfesor);

router.put("/:id", 
    validate(idSchema, "params"),
    validate(updateProfesorSchema, "body"),
    profesorController.actualizarProfesor);

router.delete("/:id", 
    validate(idSchema, "params"),
    profesorController.eliminarProfesor);

export default router;
