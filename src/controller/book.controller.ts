import { rm } from "fs/promises";
import Blogschema from "../schemas/blog.schema";
import { NextFunction, Request, Response } from "express";
import upload from "../config/multer";
import { Blog } from "../config/db";
import path from "path";
const uploads = upload.single("img");

export const postBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const value = await Blogschema.validateAsync({
      ...req.body,
      img: req.file?.filename,
    });
    const blog = await Blog.create({
      data: {
        ...value,
        img: req.file?.filename,
        authorId: 1, //FIXME: get the author id from the token
      },
    });
    return res.send(blog);
  } catch (err) {
    if (req.file?.filename) {
      //if the validation fails, delete the uploaded file
      await rm(path.join(__dirname, "./uploads/", req.file?.filename));
    }
    next(err);
  }
};
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = Number(req.query?.page) || 1;
  const PAGE_SIZE = 5;
  const limit = Number(req.query?.limit) || PAGE_SIZE;
  const results = await Blog.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  res.send(results);
};
