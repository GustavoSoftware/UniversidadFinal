import { Request, Response } from "express";
import * as alumnoService from "../services/alumno.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarAlumnos = async (_: Request, res: Response) => {
  try {
    const data = await alumnoService.getAllAlumnos();
    res.json(BaseResponse.success("Alumnos obtenidos", data));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al listar alumnos"));
  }
};

export const obtenerAlumno = async (req: Request, res: Response) => {
  try {
    const alumno = await alumnoService.getAlumnoById(Number(req.params.id));
    if (!alumno) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Alumno no encontrado"));
    }
    res.json(BaseResponse.success("Alumno encontrado", alumno));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al obtener alumno"));
  }
};

export const crearAlumno = async (req: Request, res: Response) => {
  try {
    const alumno = await alumnoService.createAlumno(req.body);
    res.status(STATUS_CREATED)
      .json(BaseResponse.success("Alumno creado", alumno));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al crear alumno"));
  }
};

export const actualizarAlumno = async (req: Request, res: Response) => {
  try {
    const alumno = await alumnoService.updateAlumno(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Alumno actualizado", alumno));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar alumno"));
  }
};

export const eliminarAlumno = async (req: Request, res: Response) => {
  try {
    await alumnoService.deleteAlumno(Number(req.params.id));
    res.json(BaseResponse.success("Alumno eliminado", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al eliminar alumno"));
  }
};
