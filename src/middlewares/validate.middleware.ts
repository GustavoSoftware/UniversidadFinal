import { Request, Response, NextFunction } from "express";
import { STATUS_BAD_REQUEST } from "../shared/constants";
import { BaseResponse } from "../shared/base-response";
import { ObjectSchema } from "joi";

export const validate =
  (schema: ObjectSchema, property: "body" | "params" | "query") =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], {
      abortEarly: false,
    });

    if (error) {
      const messages = error.details.map((d) => d.message);
      return res
        .status(STATUS_BAD_REQUEST)
        .json(BaseResponse.error(messages.join(", ")));
    }

    next();
  };
