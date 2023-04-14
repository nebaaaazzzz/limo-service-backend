import { rm } from "fs/promises";
import { CarPostschema, CarUpdateschema } from "../schemas/car.schema";
import { NextFunction, Request, Response } from "express";
import upload from "../config/multer";
import { Car } from "../config/db";
import path from "path";
import { catchAsync } from "../util/error";

const uploads = upload.single("img");
export const postCar = [
  uploads,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await CarPostschema.validateAsync({
        ...req.body,
        img: req.file?.filename,
      });
      const car = await Car.create({
        data: {
          ...value,
          img: req.file?.filename,
          authorId: 1, //FIXME: get the author id from the token
        },
      });
      return res.send(car);
    } catch (err) {
      if (req.file?.filename) {
        //if the validation fails, delete the uploaded file
        await rm(path.join(__dirname, "./uploads/", req.file?.filename));
      }
      next(err);
    }
  },
];
export const getCars = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await Car.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    res.send(results);
  }
);
export const getCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const carId = Number(req.params.id);
    const car = await Car.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) {
      return res.status(404).send("Car not found");
    }
    res.send(car);
  }
);

export const deleteCar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const carId = Number(req.params.id);
    const car = await Car.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) {
      return res.status(404).send("Car not found");
    }
    await Car.delete({
      where: {
        id: carId,
      },
    });
    res.send("car deleted");
  }
);

export const updateCar = [
  uploads,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carId = Number(req.params.id);
      const car = await Car.findUnique({
        where: {
          id: carId,
        },
      });
      if (!car) {
        return res.status(404).send("Car not found");
      }
      const body = req.body;
      if (req.file) {
        body["img"] = req.file?.filename;
      }
      const value = await CarUpdateschema.validateAsync(body);
      const updatedCar = await Car.update({
        where: {
          id: carId,
        },
        data: value,
      });
      res.send(updatedCar);
    } catch (err) {
      if (req.file?.filename) {
        //if the validation fails, delete the uploaded file
        await rm(path.join(__dirname, "./uploads/", req.file?.filename));
      }
      next(err);
    }
  },
];
