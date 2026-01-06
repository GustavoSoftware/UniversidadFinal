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

router.post("/", validate(usuarioCreateSchema, "body"), crearUsuario);

router.get("/", listarUsuarios);

router.get("/:id", obtenerUsuario);

router.put("/:id", validate(usuarioUpdateSchema, "body"), actualizarUsuario);

router.patch(
  "/:id",
  validate(usuarioUpdatePartialSchema, "body"),
  actualizarUsuarioParcial
);

router.delete("/:id", eliminarUsuario);

export default router;
