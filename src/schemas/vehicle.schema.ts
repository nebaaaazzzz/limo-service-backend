import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const VehiclePostschema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  model: Joi.string().min(3).max(50).required(),
  img: Joi.string().required(),
  description: Joi.string().required(),
  speed: Joi.number().required().min(0),
  passengerSize: Joi.number().required().min(0),
  pricePerDay: Joi.number().required().min(0),
  // type VehicleType
});
const VehicleUpdateschema = Joi.object({
  name: Joi.string().min(3).max(50),
  model: Joi.string().min(3).max(50),
  img: Joi.string(),
  description: Joi.string(),
  speed: Joi.number().min(0),
  passengerSize: Joi.number().min(0),
  pricePerDay: Joi.number().min(0),
});

export { VehiclePostschema, VehicleUpdateschema };
