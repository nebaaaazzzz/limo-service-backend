import Joi from "joi";
const BlogPostschema = Joi.object({
  title: Joi.string().max(500).required(),
  img: Joi.string().required(),
  content: Joi.string().max(200000).required(),
  // published: Joi.boolean().required(),
});
const BlogUpdateschema = Joi.object({
  title: Joi.string().max(500),
  img: Joi.string(),
  content: Joi.string().max(200000),
  // published: Joi.boolean(),
});

export { BlogPostschema, BlogUpdateschema };
