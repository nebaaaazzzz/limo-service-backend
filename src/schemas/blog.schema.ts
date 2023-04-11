import Joi from "joi";
const Blogschema = Joi.object({
  title: Joi.string().max(50).required(),
  img: Joi.string().required(),
  content: Joi.string().max(1000).required(),
  published: Joi.boolean().required(),
});

export default Blogschema;
