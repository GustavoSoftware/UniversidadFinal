import { Request, Response } from "express";
import * as cursoService from "../services/curso.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarCursos = async (_: Request, res: Response) => {
  try {
    const data = await cursoService.getAllCursos();
    res.json(BaseResponse.success("Cursos obtenidos", data));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al listar cursos"));
  }
};

export const obtenerCurso = async (req: Request, res: Response) => {
  try {
    const curso = await cursoService.getCursoById(Number(req.params.id));
    if (!curso) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Curso no encontrado"));
    }
    res.json(BaseResponse.success("Curso encontrado", curso));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al obtener curso"));
  }
};

export const crearCurso = async (req: Request, res: Response) => {
  try {
    const curso = await cursoService.createCurso(req.body);
    res.status(STATUS_CREATED)
      .json(BaseResponse.success("Curso creado", curso));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al crear curso"));
  }
};

export const actualizarCurso = async (req: Request, res: Response) => {
  try {
    const curso = await cursoService.updateCurso(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Curso actualizado", curso));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar curso"));
  }
};

export const actualizarCursoParcial = async (req: Request, res: Response) => {
  try {
    const curso = await cursoService.updateCursoPartial(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Curso actualizado", curso));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar curso"));
  }
};

export const eliminarCurso = async (req: Request, res: Response) => {
  try {
    await cursoService.deleteCurso(Number(req.params.id));
    res.json(BaseResponse.success("Curso eliminado", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al eliminar curso"));
  }
};
