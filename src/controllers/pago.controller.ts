import { Request, Response } from "express";
import * as pagoService from "../services/pago.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const listarPagos = async (_: Request, res: Response) => {
  try {
    const data = await pagoService.getAllPagos();
    res.json(BaseResponse.success("Pagos obtenidos", data));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al listar pagos"));
  }
};

export const obtenerPago = async (req: Request, res: Response) => {
  try {
    const pago = await pagoService.getPagoById(Number(req.params.id));
    if (!pago) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Pago no encontrado"));
    }
    res.json(BaseResponse.success("Pago encontrado", pago));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al obtener pago"));
  }
};

export const crearPago = async (req: Request, res: Response) => {
  try {
    const pago = await pagoService.createPago(req.body);
    res.status(STATUS_CREATED)
      .json(BaseResponse.success("Pago registrado correctamente", pago));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al registrar pago"));
  }
};

export const actualizarPago = async (req: Request, res: Response) => {
  try {
    const pago = await pagoService.updatePago(
      Number(req.params.id),
      req.body
    );
    if (!pago) {
      return res.status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Pago no encontrado"));
    }
    res.json(BaseResponse.success("Pago actualizado", pago));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al actualizar pago"));
  }
};

export const eliminarPago = async (req: Request, res: Response) => {
  try {
    await pagoService.deletePago(Number(req.params.id));
    res.json(BaseResponse.success("Pago eliminado", null));
  } catch {
    res.status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error al eliminar pago"));
  }
};
