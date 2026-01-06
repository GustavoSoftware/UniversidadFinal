import { Request, Response } from "express";
import { BaseResponse } from "../shared/base-response";
import * as authService from "../services/auth.service";
import {
  RESPONSE_CREDENTIALS_ERROR,
  STATUS_UNAUTHORIZED,
} from "../shared/constants";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const response = await authService.login(username, password);

  if (!response) {
    return res
      .status(STATUS_UNAUTHORIZED)
      .json(BaseResponse.error(RESPONSE_CREDENTIALS_ERROR));
  }

  res.json(BaseResponse.success("ingreso concedido", response));
};
