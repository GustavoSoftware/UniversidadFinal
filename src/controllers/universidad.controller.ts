import { Request, Response } from "express";
import * as dbService from "../services/universidad.service";
import { BaseResponse } from "../shared/base-response";
import { STATUS_CREATED, STATUS_INTERNAL_SERVER_ERROR, STATUS_NOT_FOUND } from "../shared/constants";

// Obtener todos los registros de una tabla
export const listarTodo = async (req: Request, res: Response) => {
  try {
    const { tabla } = req.params; // Ejemplo: /alumnos
    const resultados = await dbService.getAll(tabla);
    res.json(BaseResponse.success("Registros obtenidos exitosamente", resultados));
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error("Error al obtener los registros"));
  }
};

// Obtener un registro por ID
export const obtenerUno = async (req: Request, res: Response) => {
  try {
    const { tabla, id } = req.params;
    const resultado = await dbService.getById(tabla, Number(id));
    
    if (!resultado) {
      return res.status(STATUS_NOT_FOUND).json(BaseResponse.error("Registro no encontrado"));
    }
    res.json(BaseResponse.success("Registro obtenido exitosamente", resultado));
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error("Error al obtener el registro"));
  }
};

// Crear un nuevo registro
export const crear = async (req: Request, res: Response) => {
  try {
    const { tabla } = req.params;
    const nuevo = await dbService.create(tabla, req.body);
    res.status(STATUS_CREATED).json(BaseResponse.success("Registro creado exitosamente", nuevo));
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error("Error al crear el registro"));
  }
};

// Actualizar un registro
export const actualizar = async (req: Request, res: Response) => {
  try {
    const { tabla, id } = req.params;
    const editado = await dbService.update(tabla, Number(id), req.body);
    res.json(BaseResponse.success("Registro actualizado exitosamente", editado));
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error("Error al actualizar el registro"));
  }
};

// Eliminación lógica
export const eliminar = async (req: Request, res: Response) => {
  try {
    const { tabla, id } = req.params;
    await dbService.deleteLogic(tabla, Number(id));
    res.json(BaseResponse.success(`Registro en ${tabla} desactivado correctamente`, null));
  } catch (error) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error("Error al eliminar el registro"));
  }
};
