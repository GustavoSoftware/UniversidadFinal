import Joi from "joi";

export const createPagoSchema = Joi.object({
  id_alumno: Joi.number().integer().positive().required(),
  monto: Joi.number().positive().required(),
  concepto: Joi.string().max(100).required(),
  fecha_pago: Joi.date().required(),
  metodo_pago: Joi.string().max(30).optional(),
});

export const updatePagoSchema = Joi.object({
  monto: Joi.number().positive().optional(),
  concepto: Joi.string().max(100).optional(),
  fecha_pago: Joi.date().optional(),
  metodo_pago: Joi.string().max(30).optional(),
});
