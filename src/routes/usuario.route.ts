import { Router } from "express";
import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  actualizarUsuarioParcial,
  eliminarUsuario,
} from "../controllers/usuario.controller";

import { validate } from "../middlewares/validate.middleware";
import {
  usuarioCreateSchema,
  usuarioUpdateSchema,
  usuarioUpdatePartialSchema,
} from "../schemas/usuario.schema";

const router = Router();

/**
 * @openapi
 * /api/v1/usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Listar usuarios
 *     description: Lista todos los usuarios existentes (requiere autenticación)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Listado de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: "usuario1"
 *                   password:
 *                     type: string
 *                     example: "password123"
 *                   rol:
 *                     type: string
 *                     example: "ADMIN"
 *       401:
 *         description: Acceso denegado
 *       500:
 *         description: Error interno del servidor
 */

router.get("/", listarUsuarios);

/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtener usuario
 *     description: Obtiene un usuario por su id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el usuario
 *       500:
 *         description: Error en el servidor
 */

router.get("/:id", obtenerUsuario);

/**
 * @openapi
 * /api/v1/usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crear usuario
 *     description: Crea un nuevo usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password, rol]
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario1"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               rol:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: Usuario creado correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se pudo crear el usuario
 *       500:
 *         description: Error en el servidor
 */

router.post("/", validate(usuarioCreateSchema, "body"), crearUsuario);

/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Atualizar Usuario
 *     description: Actualiza un usuario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, password, rol]
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario1"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               rol:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: Usuario actualizada correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: No se proporcionaron datos completos
 *       404:
 *         description: No se encontro el usuario
 *       500:
 *         description: Error en el servidor
 */

router.put("/:id", validate(usuarioUpdateSchema, "body"), actualizarUsuario);

/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   patch:
 *     tags: [Usuarios]
 *     summary: Actualizar parcialmente un usuario
 *     description: Actualiza uno o más campos de un usuario por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario1"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               rol:
 *                 type: string
 *                 example: "ADMIN"
 *     responses:
 *       200:
 *         description: Usuario actualizada correctamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el usuario
 *       500:
 *         description: Error en el servidor
 */

router.patch(
  "/:id",
  validate(usuarioUpdatePartialSchema, "body"),
  actualizarUsuarioParcial
);

/**
 * @openapi
 * /api/v1/usuarios/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Eliminar usuario
 *     description: Elimina un usuario de forma logica
 *     parameters:
 *      - in: path
 *        name: id
 *        description: ID del usuario
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado logicamente
 *       401:
 *         description: Acceso denegado
 *       404:
 *         description: No se encontro el usuario
 *       500:
 *         description: Error en el servidor
 */

router.delete("/:id", eliminarUsuario);

export default router;
