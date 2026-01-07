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

/**
 * @openapi
 * /api/v1/carreras:
 *   get:
 *     tags: [Carreras]
 *     description: Listar todas las carreras
 *     responses:
 *       200:
 *         description: Lista de carreras
 */
router.get("/", carreraController.listarCarreras);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   get:
 *     tags: [Carreras]
 *     description: Listar carrera por id
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID de la persona
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Lista de carreras
 */
router.get(
  "/:id",
  validate(idSchema, "params"),
  carreraController.obtenerCarrera
);

/**
 * @openapi
 * /api/v1/carreras:
 *   post:
 *     tags: [Carreras]
 *     description: Crear una nueva carrera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_carrera]
 *             requiered: [facultad]
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *               fecultad:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Persona creada correctamente
 */
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
