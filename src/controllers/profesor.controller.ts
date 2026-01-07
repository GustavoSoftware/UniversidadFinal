import { Request, Response } from "express";
import * as profesorService from "../services/profesor.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarProfesores = async (_req: Request, res: Response) => {
  try {
    const profesores = await profesorService.getAllProfesores();
    res.json(BaseResponse.success("Profesores obtenidos", profesores));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
    .json(BaseResponse.error("Error al listar profesores"));
  }
};

export const obtenerProfesor = async (req: Request, res: Response) => {
  try {
    const profesor = await profesorService.getProfesorById(Number(req.params.id));

    if (!profesor) {
      return res.status(STATUS_NOT_FOUND)
      .json({ mensaje: "Profesor no encontrado" });
    }
    res.json(BaseResponse.success("Profesor encontrado", profesor));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
    .json(BaseResponse.error("Error al obtener profesor"));
  }
};

export const crearProfesor = async (req: Request, res: Response) => {
  try {
    const profesor = await profesorService.createProfesor(req.body);
    res.status(STATUS_CREATED)
    .json(BaseResponse.success("Profesor creado", profesor));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
    .json(BaseResponse.error("Error al crear profesor"));
  }
};

export const actualizarProfesor = async (req: Request, res: Response) => {
    try {
    const profesorActualizado = await profesorService.updateProfesor(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Profesor actualizado", profesorActualizado));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
    .json(BaseResponse.error("Error al actualizar profesor"));
  }
};

export const eliminarProfesor = async (req: Request, res: Response) => {
  try {
    await profesorService.deleteProfesor(Number(req.params.id));
    res.json(BaseResponse.success("Profesor eliminado", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
    .json(BaseResponse.error("Error al eliminar profesor"));
  }
};
