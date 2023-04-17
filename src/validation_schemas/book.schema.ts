import Joi from "joi";
const BookPostschema = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  fromAddress: Joi.string().min(2).required(),
  toAddress: Joi.string().min(2).required(),
  email: Joi.string().required().email(),
  phoneNumber: Joi.string().required(),
  luggageCount: Joi.string().required().min(1).max(2),
  personCount: Joi.string().required().min(1).max(2),
  journeyDate: Joi.date().required(),
  description: Joi.string().required(),
  vehicleId: Joi.number().required(),
});

const BookUpdateschema = Joi.object({
  firstName: Joi.string().min(3).max(50),
  lastName: Joi.string().min(3).max(50),
  fromAddress: Joi.string().min(2),
  toAddress: Joi.string().min(2),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(8).max(10),
  luggageCount: Joi.string().min(1).max(2),
  personCount: Joi.string().min(1).max(2),
  journeyDate: Joi.date(),
  description: Joi.string(),
  vehicleId: Joi.number(),
});

export { BookPostschema, BookUpdateschema };
