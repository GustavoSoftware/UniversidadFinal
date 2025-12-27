import { Request, Response } from "express";
import * as carreraService from "../services/carrera.service";
import { BaseResponse } from "../shared/base-response";
import { STATUS_CREATED, STATUS_NOT_FOUND } from "../shared/constants";

export const listarCarreras = async (_req: Request, res: Response) => {
  const carreras = await carreraService.getAllCarreras();
  res.json(BaseResponse.success("Carreras obtenidas exitosamente", carreras));
};

export const obtenerCarrera = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const carrera = await carreraService.getCarreraById(id);

  if (!carrera) {
    return res.status(STATUS_NOT_FOUND).json(BaseResponse.error("Carrera no encontrada"));
  }
  res.json(BaseResponse.success("Carrera obtenida exitosamente", carrera));
};

export const crearCarrera = async (req: Request, res: Response) => {
  const nueva = await carreraService.createCarrera(req.body);
  res.status(STATUS_CREATED).json(BaseResponse.success("Carrera creada exitosamente", nueva));
};

export const actualizarCarrera = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const actualizada = await carreraService.updateCarrera(id, req.body);
  res.json(BaseResponse.success("Carrera actualizada exitosamente", actualizada));
};

export const eliminarCarrera = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await carreraService.deleteCarrera(id);
  res.json(BaseResponse.success("Carrera desactivada exitosamente", null));
};
