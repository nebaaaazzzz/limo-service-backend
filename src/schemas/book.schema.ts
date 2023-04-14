import Joi from "joi";
const Bookschema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string().required().email(),
  from: Joi.string().min(2).required(),
  to: Joi.string().min(2).required(),
  persons: Joi.number().greater(0).required(),
  luggage: Joi.number().greater(-1).required(),
  description: Joi.string(),
});

export default Bookschema;
