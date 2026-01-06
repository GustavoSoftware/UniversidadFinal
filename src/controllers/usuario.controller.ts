import { Request, Response } from "express";
import * as usuarioService from "../services/usuario.service";
import { BaseResponse } from "../shared/base-response";
import {
  STATUS_BAD_REQUEST,
  STATUS_CREATED,
  STATUS_INTERNAL_SERVER_ERROR,
  STATUS_NOT_FOUND,
} from "../shared/constants";

export const crearUsuario = async (req: Request, res: Response) => {
  try {
    console.log(">>> ENTRÓ A crearUsuario <<<");

    const nueva = await usuarioService.createUsuario(req.body); //req.user.id_usuario

    if (!nueva) {
      return res
        .status(STATUS_BAD_REQUEST)
        .json(BaseResponse.error("enviar datos requeridos"));
    }

    res
      .status(STATUS_CREATED)
      .json(BaseResponse.success("Usuario creado exitosamente", nueva));
  } catch (error) {
    console.error("error al crear usuario", error);
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const listarUsuarios = async (_req: Request, res: Response) => {
  try {
    const Usuarios = await usuarioService.getAllUsuarios();

    if (!Usuarios || Usuarios.length === 0) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("No existen Usuarios"));
    }

    res.json(BaseResponse.success("Usuarios obtenidos exitosamente", Usuarios));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const Usuario = await usuarioService.getUsuarioById(id);

    if (!Usuario) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Usuario no encontrado"));
    }
    res.json(BaseResponse.success("Usuario obtenido exitosamente", Usuario));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const actualizada = await usuarioService.updateUsuario(id, req.body, 1); //req.user.id_usuario

    if (!actualizada) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Usuario no encontrado"));
    }

    res.json(
      BaseResponse.success("Usuario actualizado exitosamente", actualizada)
    );
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const actualizarUsuarioParcial = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const actualizada = await usuarioService.updateUsuarioPartial(
      id,
      req.body,
      1
    ); //req.user.id_usuario

    if (!actualizada) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Usuario no encontrado"));
    }

    res.json(
      BaseResponse.success("Usuario actualizado parcialmente", actualizada)
    );
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const eliminada = await usuarioService.deleteUsuario(id);

    if (!eliminada) {
      return res
        .status(STATUS_NOT_FOUND)
        .json(BaseResponse.error("Usuario no encontrado"));
    }

    res.json(BaseResponse.success("Usuario desactivado exitosamente", null));
  } catch (error) {
    res
      .status(STATUS_INTERNAL_SERVER_ERROR)
      .json(BaseResponse.error("Error interno del servidor"));
  }
};
