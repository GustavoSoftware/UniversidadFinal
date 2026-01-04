import { Request, Response } from "express";
import * as horarioService from "../services/horario.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarHorarios = async (_: Request, res: Response) => {
  try {
    const data = await horarioService.getAllHorarios();
    res.json(BaseResponse.success("Horarios obtenidos", data));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al listar horarios"));
  }
};

export const obtenerHorario = async (req: Request, res: Response) => {
  try {
    const horario = await horarioService.getHorarioById(Number(req.params.id));
    if (!horario) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Horario no encontrado"));
    }
    res.json(BaseResponse.success("Horario encontrado", horario));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al obtener horario"));
  }
};

export const crearHorario = async (req: Request, res: Response) => {
  try {
    const horario = await horarioService.createHorario(req.body);
    res.status(STATUS_CREATED)
      .json(BaseResponse.success("Horario creado", horario));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al crear horario"));
  }
};

export const actualizarHorario = async (req: Request, res: Response) => {
  try {
    const horario = await horarioService.updateHorario(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Horario actualizado", horario));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar horario"));
  }
};

export const actualizarHorarioParcial = async (req: Request, res: Response) => {
  try {
    const horario = await horarioService.updateHorarioPartial(
      Number(req.params.id),
      req.body
    );
    res.json(BaseResponse.success("Horario actualizado", horario));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar horario"));
  }
};

export const eliminarHorario = async (req: Request, res: Response) => {
  try {
    await horarioService.deleteHorario(Number(req.params.id));
    res.json(BaseResponse.success("Horario eliminado", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al eliminar horario"));
  }
};
