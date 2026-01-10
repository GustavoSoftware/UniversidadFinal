import { Router } from "express";
import * as calificacionController from "../controllers/calificacion.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import {
  createCalificacionSchema,
  updateCalificacionSchema,
} from "../schemas/calificaciones.schemas";

const router = Router();

/**
 * @openapi
 * /api/v1/calificaciones:
 *   get:
 *     tags: [Calificaciones]
 *     summary: Listar calificaciones
 *     description: Lista todas las calificaciones existentes (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de calificaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_nota:
 *                     type: integer
 *                     example: 1
 *                   tipo_examen:
 *                     type: string
 *                     example: "Opcion multiple"
 *                   puntaje:
 *                     type: integer
 *                     example: "15"
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", calificacionController.listarCalificaciones);

/**
 * @openapi
 * /api/v1/calificaciones/{id}:
 *   get:
 *     tags: [Calificaciones]
 *     summary: Obtener calificaciones
 *     description: Obtiene una calificacion por su id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID de la calificacione
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Calificacion obtenida correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro la calificacione
 *       500:
 *         description: Error en el servidor
 */
router.get(
  "/:id",
  validate(idSchema, "params"),
  calificacionController.obtenerCalificacion
);

/**
 * @openapi
 * /api/v1/calificaciones:
 *   post:
 *     tags: [Calificaciones]
 *     summary: Crear calificacion
 *     description: Crea una nueva calificacion
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tipo_examen, puntaje]
 *             properties:
 *               tipo_examen:
 *                 type: string
 *                 example: "Opcion multiple"
 *               puntaje:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Calificacion creada correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se pudo crear la calificacion
 *       500:
 *         description: Error en el servidor
 */
router.post(
  "/",
  validate(createCalificacionSchema, "body"),
  calificacionController.crearCalificacion
);

/**
 * @openapi
 * /api/v1/calificaciones/{id}:
 *   put:
 *     tags: [Calificaciones]
 *     summary: Atualizar calificacion
 *     description: Actualiza una calificacion por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la calificacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tipo_examen, puntaje]
 *             properties:
 *               tipo_examen:
 *                 type: string
 *                 example: "sistemas"
 *               puntaje:
 *                 type: string
 *                 example: "sistemas"
 *     responses:
 *       200:
 *         description: calificacione actualizada correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se proporcionaron datos completos
 *       404:
 *         description: No se encontro la calificacione
 *       500:
 *         description: Error en el servidor
 */
router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(createCalificacionSchema, "body"),
  calificacionController.actualizarCalificacion
);

/**
 * @openapi
 * /api/v1/calificaciones/{id}:
 *   patch:
 *     tags: [Calificacions]
 *     summary: Actualizar parcialmente una calificacion
 *     description: Actualiza uno o más campos de una calificacion por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la calificacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_examen:
 *                 type: string
 *                 example: "Ingeniería de Software"
 *               facultad:
 *                 type: string
 *                 example: "Facultad de Ingeniería"
 *     responses:
 *       200:
 *         description: calificacion actualizada correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro la calificacion
 *       500:
 *         description: Error en el servidor
 */
router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateCalificacionSchema, "body"),
  calificacionController.actualizarCalificacionParcial
);

/**
 * @openapi
 * /api/v1/calificaciones/{id}:
 *   delete:
 *     tags: [Calificaciones]
 *     summary: Eliminar calificacion
 *     description: Eimina una calificacion de forma logica
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID de la calificacion
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: calificacion eliminada logicamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro la calificacion
 *       500:
 *         description: Error en el servidor
 */
router.delete(
  "/:id",
  validate(idSchema, "params"),
  calificacionController.eliminarCalificacion
);

export default router;
