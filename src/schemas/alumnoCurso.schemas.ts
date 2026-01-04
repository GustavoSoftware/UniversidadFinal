import Joi from "joi";

export const createAlumnoCursoSchema = Joi.object({
  id_alumno: Joi.number().integer().positive().required(),
  id_curso: Joi.number().integer().positive().required(),
});
