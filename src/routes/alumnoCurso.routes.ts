import { Router } from "express";
import * as alumnoCursoController from "../controllers/alumnoCurso.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import { createAlumnoCursoSchema } from "../schemas/alumnoCurso.schemas";

const router = Router();

router.get("/", alumnoCursoController.listarAlumnoCurso);

router.get(
  "/:id",
  validate(idSchema, "params"),
  alumnoCursoController.obtenerAlumnoCurso
);

router.post(
  "/",
  validate(createAlumnoCursoSchema, "body"),
  alumnoCursoController.crearAlumnoCurso
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  alumnoCursoController.eliminarAlumnoCurso
);

export default router;
