import { Request, Response } from "express";
import * as calificacionService from "../services/calificacion.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarCalificaciones = async (_: Request, res: Response) => {
  try {
    const data = await calificacionService.getAllCalificaciones();
    res.json(BaseResponse.success("Calificaciones obtenidas", data));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al listar calificaciones"));
  }
};

export const obtenerCalificacion = async (req: Request, res: Response) => {
  try {
    const nota = await calificacionService.getCalificacionById(
      Number(req.params.id)
    );
    if (!nota) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Calificación no encontrada"));
    }
    res.json(BaseResponse.success("Calificación encontrada", nota));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al obtener calificación"));
  }
};

export const crearCalificacion = async (req: Request, res: Response) => {
  try {
    const nota = await calificacionService.createCalificacion(req.body);
    res.status(STATUS_CREATED)
      .json(BaseResponse.success("Calificación registrada", nota));
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(400)
        .json(BaseResponse.error("La nota para este examen ya existe"));
    }
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al registrar calificación"));
  }
};

export const actualizarCalificacion = async (req: Request, res: Response) => {
  try {
    const nota = await calificacionService.updateCalificacion(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Calificación actualizada", nota));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar calificación"));
  }
};

export const actualizarCalificacionParcial = async (
  req: Request,
  res: Response
) => {
  try {
    const nota = await calificacionService.updateCalificacionPartial(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Calificación actualizada", nota));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar calificación"));
  }
};

export const eliminarCalificacion = async (req: Request, res: Response) => {
  try {
    await calificacionService.deleteCalificacion(Number(req.params.id));
    res.json(BaseResponse.success("Calificación eliminada", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al eliminar calificación"));
  }
};
