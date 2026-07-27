import { Request, Response, NextFunction } from "express";
import { STATUS_BAD_REQUEST } from "../shared/constants";
import { BaseResponse } from "../shared/base-response";
import { ObjectSchema } from "joi";


export const validate =
  (schema: ObjectSchema, property: "body" | "params" | "query") =>
  (req: Request, res: Response, next: NextFunction) => {
    console.log("VALIDANDO:", property, req[property]);

    const { error } = schema.validate(req[property], {
      abortEarly: false,
    });

    if (error) {
      console.log("ERROR JOI:", error.details);
      return res.status(400).json({
        success: false,
        message: error.details.map((d) => d.message).join(", "),
      });
    }

    next();
  };
