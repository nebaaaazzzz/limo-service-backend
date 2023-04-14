import { rm } from "fs/promises";
import { BookPostschema, BookUpdateschema } from "../schemas/book.schema";
import { NextFunction, Request, Response } from "express";
import { Book } from "../config/db";
import { catchAsync } from "../util/error";

export const postReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const value = await BookPostschema.validateAsync(req.body);
    const book = await Book.create({
      data: value,
    });
    return res.status(201).send(book);
  }
);
export const getReservations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await Book.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    res.send(results);
  }
);
export const getReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.id);
    const blog = await Book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!blog) {
      return res.status(404).send("reservation not found");
    }
    res.send(blog);
  }
);
export const deleteReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.id);
    const blog = await Book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!blog) {
      return res.status(404).send("reservation not found");
    }
    await Book.delete({
      where: {
        id: bookId,
      },
    });
    res.send("Blog deleted");
  }
);

export const updateReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookId = Number(req.params.id);
    const blog = await Book.findUnique({
      where: {
        id: bookId,
      },
    });
    if (!blog) {
      return res.status(404).send("reservation not found");
    }
    const value = await BookUpdateschema.validateAsync(req.body);
    const updatedBlog = await Book.update({
      where: {
        id: bookId,
      },
      data: value,
    });
    res.send(updatedBlog);
  }
);
