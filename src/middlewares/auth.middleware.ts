import { Request, Response } from "express";
import { STATUS_UNAUTHORIZED } from "../shared/constants";
import { BaseResponse } from "../shared/base-response";
import * as jwt from "jsonwebtoken";
import { env } from "../config/env";

export const requireAuth = (req: Request, res: Response, next: Function) => {
  const header = req.headers.authorization;

  if (!header) {
    return res
      .status(STATUS_UNAUTHORIZED)
      .json(BaseResponse.error("No se proporciono token de autenticacion"));
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    //req.usuario = decoded;

    next();
  } catch (error) {
    return res
      .status(STATUS_UNAUTHORIZED)
      .json(BaseResponse.error("token invalido"));
  }
};
