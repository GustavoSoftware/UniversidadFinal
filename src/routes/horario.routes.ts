import { Router } from "express";
import * as horarioController from "../controllers/horario.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import {
  createHorarioSchema,
  updateHorarioSchema,
} from "../schemas/horario.schemas";

const router = Router();

/**
 * @openapi
 * /api/v1/horarios:
 *   get:
 *     tags: [Horarios]
 *     summary: Listar horarios
 *     description: Lista todos los horarios existentes (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de horarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_horario:
 *                     type: integer
 *                     example: 1
 *                   id_curso:
 *                     type: integer
 *                     example: 1
 *                   pabellon:
 *                     type: string
 *                     example: "A"
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", horarioController.listarHorarios);

/**
 * @openapi
 * /api/v1/horarios/{id}:
 *   get:
 *     tags: [Horarios]
 *     summary: Obtener horario
 *     description: Obtiene un horario por su id
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
 *         description: Horario obtenido correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el horario
 *       500:
 *         description: Error en el servidor
 */

router.get(
  "/:id",
  validate(idSchema, "params"),
  horarioController.obtenerHorario
);

/**
 * @openapi
 * /api/v1/horarios:
 *   post:
 *     tags: [Horarios]
 *     summary: Crear horario
 *     description: Crea un nuevo horario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id_curso, pabellon, nro_aula, dia_semana]
 *             properties:
 *               id_curso:
 *                 type: integer
 *                 example: 1
 *               pabellon:
 *                 type: string
 *                 example: "A"
 *               nro_aula:
 *                 type: string
 *                 example: "101"
 *               dia_semana:
 *                 type: string
 *                 example: "Lunes"
 *     responses:
 *       200:
 *         description: Horario creado correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se pudo crear el horario
 *       500:
 *         description: Error en el servidor
 */

router.post(
  "/",
  validate(createHorarioSchema, "body"),
  horarioController.crearHorario
);


/**
 * @openapi
 * /api/v1/horarios/{id}:
 *   put:
 *     tags: [Horarios]
 *     summary: Atualizar Horario
 *     description: Actualiza un horario por id
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
 *             required: [id_curso, pabellon, nro_aula, dia_semana]
 *             properties:
 *               id_curso:
 *                 type: integer
 *                 example: 1
 *               pabellon:
 *                 type: string
 *                 example: "A"
 *               nro_aula:
 *                 type: string
 *                 example: "101"
 *               dia_semana:
 *                 type: string
 *                 example: "Lunes"
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
  validate(createHorarioSchema, "body"),
  horarioController.actualizarHorario
);

/**
 * @openapi
 * /api/v1/horarios/{id}:
 *   patch:
 *     tags: [Horarios]
 *     summary: Actualizar parcialmente un horario
 *     description: Actualiza uno o más campos de un horario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_curso:
 *                 type: integer
 *                 example: 1
 *               pabellon:
 *                 type: string
 *                 example: "A"
 *               nro_aula:
 *                 type: string
 *                 example: "101"
 *               dia_semana:
 *                 type: string
 *                 example: "Lunes"
 *     responses:
 *       200:
 *         description: Horario actualizado correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el horario
 *       500:
 *         description: Error en el servidor
 */

router.patch(
  "/:id",
  validate(idSchema, "params"),
  validate(updateHorarioSchema, "body"),
  horarioController.actualizarHorarioParcial
);

/**
 * @openapi
 * /api/v1/horarios/{id}:
 *   delete:
 *     tags: [Horarios]
 *     summary: Eliminar horario
 *     description: Elimina un horario de forma logica
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del horario
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Horario eliminado logicamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el horario
 *       500:
 *         description: Error en el servidor
 */

router.delete(
  "/:id",
  validate(idSchema, "params"),
  horarioController.eliminarHorario
);

export default router;
