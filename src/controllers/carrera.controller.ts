import { Request, Response } from "express";
import * as carreraService from "../services/carrera.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarCarreras = async (_req: Request, res: Response) => {
  try {
    const carreras = await carreraService.getAllCarreras();

    if (!carreras || carreras.length === 0) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("No existen carreras"));
    }

    res.json(BaseResponse.success("Carreras obtenidas exitosamente", carreras));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const obtenerCarrera = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const carrera = await carreraService.getCarreraById(id);

    if (!carrera) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Carrera no encontrada"));
    }
    res.json(BaseResponse.success("Carrera obtenida exitosamente", carrera));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const crearCarrera = async (req: Request, res: Response) => {
  try {
    const nueva = await carreraService.createCarrera(req.body);

    if (!nueva) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json(BaseResponse.error("enviar datos requeridos"));
    }

    res
      .status(STATUS_CREATED)
      .json(BaseResponse.success("Carrera creada exitosamente", nueva));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const actualizarCarrera = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const actualizada = await carreraService.updateCarrera(id, req.body);

    if (!actualizada) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Carrera no encontrada"));
    }

    res.json(
      BaseResponse.success("Carrera actualizada exitosamente", actualizada)
    );
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const actualizarCarreraParcial = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const actualizada = await carreraService.updateCarreraPartial(id, req.body);

  if (!actualizada) {
    return res
      .status(STATUS_NOT_FOUND)
      .json(BaseResponse.error("Carrera no encontrada"));
  }

  res.json(
    BaseResponse.success("Carrera actualizada parcialmente", actualizada)
  );
};

export const eliminarCarrera = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const eliminada = await carreraService.deleteCarrera(id);

    if (!eliminada) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Carrera no encontrada"));
    }

    res.json(BaseResponse.success("Carrera desactivada exitosamente", null));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};
