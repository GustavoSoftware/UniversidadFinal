import Joi from "joi";

export const createHorarioSchema = Joi.object({
  id_curso: Joi.number().integer().positive().required(),
  pabellon: Joi.string().min(1).required(),
  nro_aula: Joi.string().min(1).required(),
  dia_semana: Joi.string()
    .valid("LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO")
    .required(),
});

export const updateHorarioSchema = Joi.object({
  id_curso: Joi.number().integer().positive(),
  pabellon: Joi.string(),
  nro_aula: Joi.string(),
  dia_semana: Joi.string().valid(
    "LUNES",
    "MARTES",
    "MIERCOLES",
    "JUEVES",
    "VIERNES",
    "SABADO"
  ),
})
  .min(1)
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
  });
