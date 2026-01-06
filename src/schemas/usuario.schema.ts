import Joi from "joi";

export const usuarioCreateSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(4).required(),
  rol: Joi.string().valid("ADMIN", "SECRETARIA", "DOCENTE").required(),
});

export const usuarioUpdateSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(255).required(),
  rol: Joi.string().valid("ADMIN", "SECRETARIA", "DOCENTE").required(),
});

export const usuarioUpdatePartialSchema = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  password: Joi.string().min(6).max(255).optional(),
  rol: Joi.string().valid("ADMIN", "SECRETARIA", "DOCENTE").optional(),
}).min(1);
