import { Router } from "express";
import * as pagoController from "../controllers/pago.controller";
import { validate } from "../middlewares/validate.middleware";
import { idSchema } from "../schemas/carrera.schemas";
import { createPagoSchema, updatePagoSchema } from "../schemas/pago.schemas";

const router = Router();

/**
 * @openapi
 * /api/v1/pagos:
 *   get:
 *     tags: [Pagos]
 *     summary: Listar pagos
 *     description: Lista todos los pagos existentes (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de pagos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_pago:
 *                     type: integer
 *                     example: 1
 *                   tipo_persona:
 *                     type: string
 *                     example: "Estudiante"
 *                   id_persona:
 *                     type: integer
 *                     example: 12345
 *                   monto:
 *                     type: number
 *                     example: 1500.75
 *                   concepto:
 *                     type: string
 *                     example: "Matrícula Semestre 2024-1"
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", pagoController.listarPagos);

/**
 * @openapi
 * /api/v1/pagos/{id}:
 *   get:
 *     tags: [Pagos]
 *     summary: Obtener pago
 *     description: Obtiene un pago por su id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del pago
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Pago obtenido correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el pago
 *       500:
 *         description: Error en el servidor
 */

router.get(
  "/:id",
  validate(idSchema, "params"),
  pagoController.obtenerPago
);

/**
 * @openapi
 * /api/v1/pagos:
 *   post:
 *     tags: [Pagos]
 *     summary: Crear pago
 *     description: Crea un nuevo pago
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tipo_persona, id_persona, monto, concepto]
 *             properties:
 *               tipo_persona:
 *                 type: string
 *                 example: "Estudiante"
 *               id_persona:
 *                 type: integer
 *                 example: 12345
 *               monto:
 *                 type: number
 *                 example: 1500.75
 *               concepto:
 *                 type: string
 *                 example: "Matrícula Semestre 2024-1"
 *     responses:
 *       200:
 *         description: Pago creado correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se pudo crear el pago
 *       500:
 *         description: Error en el servidor
 */

router.post(
  "/",
  validate(createPagoSchema, "body"),
  pagoController.crearPago
);

/**
 * @openapi
 * /api/v1/pagos/{id}:
 *   put:
 *     tags: [Pagos]
 *     summary: Actualizar Pago
 *     description: Actualiza un pago por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [tipo_persona, id_persona, monto, concepto]
 *             properties:
 *               tipo_persona:
 *                 type: string
 *                 example: "Estudiante"
 *               id_persona:
 *                 type: integer
 *                 example: 12345
 *               monto:
 *                 type: number
 *                 example: 1500.75
 *               concepto:
 *                 type: string
 *                 example: "Matrícula Semestre 2024-1"
 *     responses:
 *       200:
 *         description: Pago actualizado correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se proporcionaron datos completos
 *       404:
 *         description: No se encontro el pago
 *       500:
 *         description: Error en el servidor
 */

router.put(
  "/:id",
  validate(idSchema, "params"),
  validate(updatePagoSchema, "body"),
  pagoController.actualizarPago
);

/**
 * @openapi
 * /api/v1/pagos/{id}:
 *   delete:
 *     tags: [Pagos]
 *     summary: Eliminar pago
 *     description: Elimina un pago de forma logica
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del pago
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Pago eliminado logicamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el pago
 *       500:
 *         description: Error en el servidor
 */

router.delete(
  "/:id",
  validate(idSchema, "params"),
  pagoController.eliminarPago
);

export default router;
