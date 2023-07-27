import Joi from "joi";
const BlogPostschema = Joi.object({
  title: Joi.string().required(),
  img: Joi.string().required(),
  userId: Joi.string(),
  content: Joi.any().required(),
  // published: Joi.boolean().required(),
});
const BlogUpdateschema = Joi.object({
  title: Joi.string(),
  userId: Joi.string(),
  img: Joi.string(),
  content: Joi.any(),
  // published: Joi.boolean(),
});

export { BlogPostschema, BlogUpdateschema };
