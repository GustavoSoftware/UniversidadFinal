import { Router } from "express";
import * as horarioController from "../controllers/horario.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import {
  createHorarioSchema,
  updateHorarioSchema,
} from "../schemas/horario.schemas";

const router = Router();

router.get("/", horarioController.listarHorarios);

router.get(
  "/:id",
  validate(idSchema, "params"),
  horarioController.obtenerHorario
);

router.post(
  "/",
  validate(createHorarioSchema, "body"),
  horarioController.crearHorario
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(createHorarioSchema, "body"),
  horarioController.actualizarHorario
);

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateHorarioSchema, "body"),
  horarioController.actualizarHorarioParcial
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  horarioController.eliminarHorario
);

export default router;
