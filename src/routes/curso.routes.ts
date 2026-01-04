import { Router } from "express";
import * as cursoController from "../controllers/curso.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import {
  createCursoSchema,
  updateCursoSchema,
} from "../schemas/curso.schemas";

const router = Router();

router.get("/", cursoController.listarCursos);

router.get(
  "/:id",
  validate(idSchema, "params"),
  cursoController.obtenerCurso
);

router.post(
  "/",
  validate(createCursoSchema, "body"),
  cursoController.crearCurso
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(createCursoSchema, "body"),
  cursoController.actualizarCurso
);

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCursoSchema, "body"),
  cursoController.actualizarCursoParcial
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  cursoController.eliminarCurso
);

export default router;
