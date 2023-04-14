import Joi from "joi";
const CarPostschema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().required().email(),
  from: Joi.string().min(2).required(),
  to: Joi.string().min(2).required(),
  persons: Joi.string().required(),
  luggage: Joi.string().required(),
  description: Joi.string(),
});
const CarUpdateschema = Joi.object({
  firstName: Joi.string().min(3).max(50),
  lastName: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  from: Joi.string().min(2),
  to: Joi.string().min(2),
  persons: Joi.string(),
  luggage: Joi.string(),
  description: Joi.string(),
});

export { CarPostschema, CarUpdateschema };
