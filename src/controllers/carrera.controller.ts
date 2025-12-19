import { Request, Response } from "express";
import * as carreraService from "../services/carrera.service";

export const listarCarreras = async (_req: Request, res: Response) => {
  const carreras = await carreraService.getAllCarreras();
  res.json(carreras);
};

export const obtenerCarrera = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const carrera = await carreraService.getCarreraById(id);

  if (!carrera) {
    return res.status(404).json({ mensaje: "Carrera no encontrada" });
  }
  res.json(carrera);
};

export const crearCarrera = async (req: Request, res: Response) => {
  const nueva = await carreraService.createCarrera(req.body);
  res.status(201).json(nueva);
};

export const actualizarCarrera = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const actualizada = await carreraService.updateCarrera(id, req.body);
  res.json(actualizada);
};

export const eliminarCarrera = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await carreraService.deleteCarrera(id);
  res.json({ mensaje: "Carrera desactivada correctamente" });
};
