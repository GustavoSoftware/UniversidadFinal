import Joi from "joi";

export const idSchema = Joi.object({
  id: Joi.number()

    .integer()
    .positive()
    .required()
    .messages({
      "number.base": "El id debe ser un número",
      "number.integer": "El id debe ser un número entero",
      "number.positive": "El id debe ser mayor a 0",
      "any.required": "El id es obligatorio",
    }),
});

export const createCarreraSchema = Joi.object({
  nombre_carrera: Joi.string().min(3).required(),
  facultad: Joi.string().required(),
});

export const updateCarreraFullSchema = Joi.object({
  nombre_carrera: Joi.string().min(3).required().messages({
    "any.required": "El nombre de la carrera es obligatorio",
    "string.min": "El nombre de la carrera debe tener al menos 3 caracteres",
  }),

  facultad: Joi.string().min(3).required().messages({
    "any.required": "La facultad es obligatoria",
    "string.min": "La facultad debe tener al menos 3 caracteres",
  }),
}).required();

export const updateCarreraSchema = Joi.object({
  nombre_carrera: Joi.string().min(3),
  facultad: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
  });
