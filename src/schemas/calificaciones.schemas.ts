import Joi from "joi";

export const createCalificacionSchema = Joi.object({
  id_alumno: Joi.number().integer().positive().required(),
  id_curso: Joi.number().integer().positive().required(),
  tipo_examen: Joi.string()
    .valid("PARCIAL", "FINAL", "PRACTICA")
    .required(),
  puntaje: Joi.number().min(0).max(20).required(),
});

export const updateCalificacionSchema = Joi.object({
  tipo_examen: Joi.string().valid("PARCIAL", "FINAL", "PRACTICA"),
  puntaje: Joi.number().min(0).max(20),
})
  .min(1)
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
  });
