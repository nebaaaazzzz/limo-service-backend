import Joi from "joi";
const BlogPostschema = Joi.object({
  title: Joi.string().max(50).required(),
  img: Joi.string().required(),
  content: Joi.string().max(1000).required(),
  published: Joi.boolean().required(),
});
const BlogUpdateschema = Joi.object({
  title: Joi.string().max(50),
  img: Joi.string(),
  content: Joi.string().max(1000),
  published: Joi.boolean(),
});

export { BlogPostschema, BlogUpdateschema };
