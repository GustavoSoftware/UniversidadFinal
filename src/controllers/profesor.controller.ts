import { Request, Response } from "express";
import * as profesorService from "../services/profesor.service";

export const listarProfesores = async (_req: Request, res: Response) => {
  const profesores = await profesorService.getAllProfesores();
  res.json(profesores);
};

export const obtenerProfesor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const profesor = await profesorService.getProfesorById(id);

  if (!profesor) {
    return res.status(404).json({ mensaje: "Profesor no encontrado" });
  }

  res.json(profesor);
};

export const crearProfesor = async (req: Request, res: Response) => {
  const nuevoProfesor = await profesorService.createProfesor(req.body);
  res.status(201).json(nuevoProfesor);
};

export const actualizarProfesor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const profesorActualizado = await profesorService.updateProfesor(
    id,
    req.body
  );

  if (!profesorActualizado) {
    return res.status(404).json({ mensaje: "Profesor no encontrado" });
  }

  res.json(profesorActualizado);
};

export const eliminarProfesor = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const profesorEliminado = await profesorService.deleteProfesor(id);

  if (!profesorEliminado) {
    return res.status(404).json({ mensaje: "Profesor no encontrado" });
  }

  res.json({ mensaje: "Profesor desactivado correctamente" });
};
