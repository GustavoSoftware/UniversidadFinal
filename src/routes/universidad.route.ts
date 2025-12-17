import { Router } from "express";
import * as uniController from "../controllers/universidad.controller";

const router = Router();

// Rutas genéricas para las 8 tablas
router.get("/:tabla", uniController.listarTodo);         // GET /api/v1/alumnos
router.get("/:tabla/:id", uniController.obtenerUno);     // GET /api/v1/profesores/1
router.post("/:tabla", uniController.crear);             // POST /api/v1/cursos
router.put("/:tabla/:id", uniController.actualizar);     // PUT /api/v1/pagos/5
router.delete("/:tabla/:id", uniController.eliminar);    // DELETE /api/v1/carreras/2

export default router;