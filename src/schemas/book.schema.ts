import Joi from "joi";
const BookPostschema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().required().email(),
  from: Joi.string().min(2).required(),
  to: Joi.string().min(2).required(),
  persons: Joi.number().greater(0).required(),
  luggage: Joi.number().greater(-1).required(),
  description: Joi.string(),
});
const BookUpdateschema = Joi.object({
  firstName: Joi.string().min(3).max(50),
  lastName: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  from: Joi.string().min(2),
  to: Joi.string().min(2),
  persons: Joi.number().greater(0),
  luggage: Joi.number().greater(-1),
  description: Joi.string(),
});

export { BookPostschema, BookUpdateschema };
