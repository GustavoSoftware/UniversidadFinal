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
 *     summary: Listar carreras
 *     description: Lista todas las carreras existentes (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de carreras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_carrera:
 *                     type: integer
 *                     example: 1
 *                   nombre_carrera:
 *                     type: string
 *                     example: "Ingeniería de Sistemas"
 *                   facultad:
 *                     type: string
 *                     example: "Facultad de Ingeniería"
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", carreraController.listarCarreras);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   get:
 *     tags: [Carreras]
 *     summary: Obtener carrera
 *     description: Obtiene una carrera por su id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID de la carrera
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Carrera obtenida correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro la carrera
 *       500:
 *         description: Error en el servidor
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
 *     summary: Crear carrera
 *     description: Crea una nueva carrera
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_carrera, facultad]
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *                 example: "sistemas"
 *               facultad:
 *                 type: string
 *                 example: "sistemas"
 *     responses:
 *       200:
 *         description: Carrera creada correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se pudo crear la carrera
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  validate(createCarreraSchema, "body"),
  carreraController.crearCarrera
);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   put:
 *     tags: [Carreras]
 *     summary: Atualizar Carrera
 *     description: Actualiza una carrera por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre_carrera, facultad]
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *                 example: "sistemas"
 *               facultad:
 *                 type: string
 *                 example: "sistemas"
 *     responses:
 *       200:
 *         description: Carrera actualizada correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se proporcionaron datos completos
 *       404:
 *         description: No se encontro la carrera
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCarreraFullSchema, "body"),
  carreraController.actualizarCarrera
);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   patch:
 *     tags: [Carreras]
 *     summary: Actualizar parcialmente una carrera
 *     description: Actualiza uno o más campos de una carrera por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *                 example: "Ingeniería de Software"
 *               facultad:
 *                 type: string
 *                 example: "Facultad de Ingeniería"
 *     responses:
 *       200:
 *         description: Carrera actualizada correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro la carrera
 *       500:
 *         description: Error en el servidor
 */
router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCarreraSchema, "body"),
  carreraController.actualizarCarreraParcial
);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   delete:
 *     tags: [Carreras]
 *     summary: Eliminar carrera
 *     description: Eimina una carrera de forma logica
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID de la carrera
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Carrera eliminada logicamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro la carrera
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  validate(idSchema, "params"),
  carreraController.eliminarCarrera
);

export default router;
