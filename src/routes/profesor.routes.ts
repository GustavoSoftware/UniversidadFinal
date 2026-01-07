import { Router } from "express";
import * as profesorController from "../controllers/profesor.controller";
import { idSchema } from "../schemas/carrera.schemas";
import { validate } from "../middlewares/validate.middleware";
import { updateProfesorSchema } from "../schemas/profesor.schemas";

const router = Router();

/**
 * @openapi
 * /api/v1/profesores:
 *   get:
 *     tags: [Profesores]
 *     summary: Listar profesores
 *     description: Lista todos los profesores existentes (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de profesores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_profesor:
 *                     type: integer
 *                     example: 1
 *                   nombres:
 *                     type: string
 *                     example: "Juan"
 *                   apellidos:
 *                     type: string
 *                     example: "Pérez"
 *                   especialidad:
 *                     type: string
 *                     example: "Matemáticas"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@universidad.edu"
 *                   pago_mensual:
 *                     type: number
 *                     example: 2500.50
 *                   id_carrera:
 *                     type: integer
 *                     example: 2
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", 
    profesorController.listarProfesores);

/**
 * @openapi
 * /api/v1/profesores/{id}:
 *   get:
 *     tags: [Profesores]
 *     summary: Obtener profesor
 *     description: Obtiene un profesor por su id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del profesor
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Profesor obtenido correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el profesor
 *       500:
 *         description: Error en el servidor
 */

router.get("/:id", 
    validate(idSchema, "params"), 
    profesorController.obtenerProfesor);

/**
 * @openapi
 * /api/v1/profesores:
 *   post:
 *     tags: [Profesores]
 *     summary: Crear profesor
 *     description: Crea un nuevo profesor
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombres, apellidos, especialidad, email, pago_mensual, id_carrera]
 *             properties:
 *                   nombres:
 *                     type: string
 *                     example: "Juan"
 *                   apellidos:
 *                     type: string
 *                     example: "Pérez"
 *                   especialidad:
 *                     type: string
 *                     example: "Matemáticas"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@universidad.edu"
 *                   pago_mensual:
 *                     type: number
 *                     example: 2500.50
 *                   id_carrera:
 *                     type: integer
 *                     example: 2
 *     responses:
 *       200:
 *         description: Profesor creado correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se pudo crear el profesor
 *       500:
 *         description: Error en el servidor
 */

router.post("/", 
    validate(idSchema, "body"),
    profesorController.crearProfesor);

/**
 * @openapi
 * /api/v1/profesores/{id}:
 *   put:
 *     tags: [Profesores]
 *     summary: Actualizar Profesor
 *     description: Actualiza un profesor por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del profesor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombres, apellidos, especialidad, email, pago_mensual, id_carrera]
 *             properties:
 *                   nombres:
 *                     type: string
 *                     example: "Juan"
 *                   apellidos:
 *                     type: string
 *                     example: "Pérez"
 *                   especialidad:
 *                     type: string
 *                     example: "Matemáticas"
 *                   email:
 *                     type: string
 *                     example: "juan.perez@universidad.edu"
 *                   pago_mensual:
 *                     type: number
 *                     example: 2500.50
 *                   id_carrera:
 *                     type: integer
 *                     example: 2
 *     responses:
 *       200:
 *         description: Profesor actualizado correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se proporcionaron datos completos
 *       404:
 *         description: No se encontro el profesor
 *       500:
 *         description: Error en el servidor
 */

router.put("/:id", 
    validate(idSchema, "params"),
    validate(updateProfesorSchema, "body"),
    profesorController.actualizarProfesor);

/**
 * @openapi
 * /api/v1/profesores/{id}:
 *   delete:
 *     tags: [Profesores]
 *     summary: Eliminar profesor
 *     description: Elimina un profesor de forma logica
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del profesor
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Profesor eliminado logicamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el profesor
 *       500:
 *         description: Error en el servidor
 */

router.delete("/:id", 
    validate(idSchema, "params"),
    profesorController.eliminarProfesor);

export default router;
