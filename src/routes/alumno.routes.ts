import { Router } from "express";
import * as alumnoController from "../controllers/alumno.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import {
  createAlumnoSchema,
  updateAlumnoSchema,
} from "../schemas/alumno.schemas";

const router = Router();

router.get("/", alumnoController.listarAlumnos);

router.get("/:id", validate(idSchema, "params"), alumnoController.obtenerAlumno);

router.post(
  "/",
  validate(createAlumnoSchema, "body"),
  alumnoController.crearAlumno
);

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateAlumnoSchema, "body"),
  alumnoController.actualizarAlumno
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  alumnoController.eliminarAlumno
);

export default router;
