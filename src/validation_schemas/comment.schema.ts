import Joi from "joi";
const CommentPostschema = Joi.object({
  fullName: Joi.string().max(50).required(),
  email: Joi.string().email().max(50).required(),
  comment: Joi.string().max(100000).required(),
  vehicleId: Joi.number(),
});
export { CommentPostschema };
