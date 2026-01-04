import { Request, Response } from "express";
import * as alumnoCursoService from "../services/alumnoCurso.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarAlumnoCurso = async (_: Request, res: Response) => {
  try {
    const data = await alumnoCursoService.getAllAlumnoCurso();
    res.json(BaseResponse.success("Matrículas obtenidas", data));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al listar matrículas"));
  }
};

export const obtenerAlumnoCurso = async (req: Request, res: Response) => {
  try {
    const registro = await alumnoCursoService.getAlumnoCursoById(
      Number(req.params.id)
    );
    if (!registro) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Matrícula no encontrada"));
    }
    res.json(BaseResponse.success("Matrícula encontrada", registro));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al obtener matrícula"));
  }
};

export const crearAlumnoCurso = async (req: Request, res: Response) => {
  try {
    const registro = await alumnoCursoService.createAlumnoCurso(req.body);
    res.status(STATUS_CREATED)
      .json(BaseResponse.success("Alumno matriculado correctamente", registro));
  } catch (error: any) {
    if (error.code === "23505") {
      return res
        .status(400)
        .json(BaseResponse.error("El alumno ya está matriculado en este curso"));
    }
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al matricular alumno"));
  }
};

export const eliminarAlumnoCurso = async (req: Request, res: Response) => {
  try {
    await alumnoCursoService.deleteAlumnoCurso(Number(req.params.id));
    res.json(BaseResponse.success("Matrícula eliminada", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al eliminar matrícula"));
  }
};
