import { Router } from "express";
import * as pagoController from "../controllers/pago.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import { createPagoSchema, updatePagoSchema } from "../schemas/pago.schemas";

const router = Router();

router.get("/", pagoController.listarPagos);

router.get(
  "/:id",
  validate(idSchema, "params"),
  pagoController.obtenerPago
);

router.post(
  "/",
  validate(createPagoSchema, "body"),
  pagoController.crearPago
);

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updatePagoSchema, "body"),
  pagoController.actualizarPago
);

router.delete(
  "/:id",
  validate(idSchema, "params"),
  pagoController.eliminarPago
);

export default router;
