import { Request, Response } from "express";
import * as dbService from "../services/universidad.service";

// Obtener todos los registros de una tabla
export const listarTodo = async (req: Request, res: Response) => {
  try {
    const { tabla } = req.params; // Ejemplo: /alumnos
    const resultados = await dbService.getAll(tabla);
    res.json(resultados);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por ID
export const obtenerUno = async (req: Request, res: Response) => {
  try {
    const { tabla, id } = req.params;
    const resultado = await dbService.getById(tabla, Number(id));
    
    if (!resultado) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }
    res.json(resultado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo registro
export const crear = async (req: Request, res: Response) => {
  try {
    const { tabla } = req.params;
    const nuevo = await dbService.create(tabla, req.body);
    res.status(201).json(nuevo);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro
export const actualizar = async (req: Request, res: Response) => {
  try {
    const { tabla, id } = req.params;
    const editado = await dbService.update(tabla, Number(id), req.body);
    res.json(editado);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminación lógica
export const eliminar = async (req: Request, res: Response) => {
  try {
    const { tabla, id } = req.params;
    await dbService.deleteLogic(tabla, Number(id));
    res.json({ mensaje: `Registro en ${tabla} desactivado correctamente` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
