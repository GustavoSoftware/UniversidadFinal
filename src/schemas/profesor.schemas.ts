import Joi from "joi";

export const createProfesorSchema = Joi.object({
  nombres: Joi.string().min(3).required(),
  apellidos: Joi.string().min(3).required(),
  especialidad: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  pago_mensual: Joi.number().min(1).required(),
  id_carrera: Joi.number().integer().positive().required(),
});

export const updateProfesorSchema = Joi.object({
  nombres: Joi.string().min(3),
  apellidos: Joi.string().min(3),
  especialidad: Joi.string().min(3),
  email: Joi.string().email(),
  pago_mensual: Joi.number().min(1),
  id_carrera: Joi.number().integer().positive(),
})
  .min(1)
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
  });