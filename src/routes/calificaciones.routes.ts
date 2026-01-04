import { Router } from "express";
import * as calificacionController from "../controllers/calificacion.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import {
  createCalificacionSchema,
  updateCalificacionSchema,
} from "../schemas/calificaciones.schemas";

const router = Router();

router.get("/", calificacionController.listarCalificaciones);

router.get(
  "/:id",
  validate(idSchema, "params"),
  calificacionController.obtenerCalificacion
);

router.post(
  "/",
  validate(createCalificacionSchema, "body"),
  calificacionController.crearCalificacion
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(createCalificacionSchema, "body"),
  calificacionController.actualizarCalificacion
);

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCalificacionSchema, "body"),
  calificacionController.actualizarCalificacionParcial
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  calificacionController.eliminarCalificacion
);

export default router;
