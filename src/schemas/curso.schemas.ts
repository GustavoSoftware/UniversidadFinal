import Joi from "joi";

export const createCursoSchema = Joi.object({
  nombre_curso: Joi.string().min(3).required(),
  creditos: Joi.number().integer().min(1).required(),
  id_profesor: Joi.number().integer().positive().required(),
});

export const updateCursoSchema = Joi.object({
  nombre_curso: Joi.string().min(3),
  creditos: Joi.number().integer().min(1),
  id_profesor: Joi.number().integer().positive(),
})
  .min(1)
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
  });
