import { Router } from "express";
import * as carreraController from "../controllers/carrera.controller";
import { validate } from "../middlewares/validate.middleware";
import {
  createCarreraSchema,
  idSchema,
  updateCarreraFullSchema,
  updateCarreraSchema,
} from "../schemas/carrera.schemas";

const router = Router();

router.get("/", carreraController.listarCarreras);

router.get(
  "/:id",
  validate(idSchema, "params"),
  carreraController.obtenerCarrera
);

router.post(
  "/",
  validate(createCarreraSchema, "body"),
  carreraController.crearCarrera
);
router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCarreraFullSchema, "body"),
  carreraController.actualizarCarrera
);

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCarreraSchema, "body"),
  carreraController.actualizarCarreraParcial
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  carreraController.eliminarCarrera
);

export default router;
