import { rm } from "fs/promises";
import {
  VehiclePostschema,
  VehicleUpdateschema,
} from "../validation_schemas/vehicle.schema";
import { NextFunction, Request, Response } from "express";
import upload from "../config/multer";
import { Vehicle } from "../config/db";
import path from "path";
import { catchAsync } from "../util/error";

const uploads = upload.single("img");
export const postVehicle = [
  uploads,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await VehiclePostschema.validateAsync({
        ...req.body,
        img: req.file?.filename,
      });
      const car = await Vehicle.create({
        data: {
          ...value,
          img: req.file?.filename,
        },
      });
      return res.send(car);
    } catch (err) {
      if (req.file?.filename) {
        //if the validation fails, delete the uploaded file
        await rm(path.join(__dirname, "../uploads/", req.file?.filename));
      }
      next(err);
    }
  },
];
export const getVehicles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 5;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await Vehicle.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    res.send(results);
  }
);
export const getVehicle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const carId = Number(req.params.id);
    const car = await Vehicle.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) {
      return res.status(404).send("Vehicle not found");
    }
    res.send(car);
  }
);

export const deleteVehicle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const carId = Number(req.params.id);
    const car = await Vehicle.findUnique({
      where: {
        id: carId,
      },
    });
    if (!car) {
      return res.status(404).send("Vehicle not found");
    }
    await Vehicle.delete({
      where: {
        id: carId,
      },
    });
    res.send("car deleted");
  }
);

export const updateVehicle = [
  uploads,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const carId = Number(req.params.id);
      const car = await Vehicle.findUnique({
        where: {
          id: carId,
        },
      });
      if (!car) {
        return res.status(404).send("Vehicle not found");
      }
      const body = req.body;
      if (req.file) {
        body["img"] = req.file?.filename;
      }
      const value = await VehicleUpdateschema.validateAsync(body);
      const updatedCar = await Vehicle.update({
        where: {
          id: carId,
        },
        data: value,
      });
      res.send(updatedCar);
    } catch (err) {
      if (req.file?.filename) {
        //if the validation fails, delete the uploaded file
        await rm(path.join(__dirname, "../uploads/", req.file?.filename));
      }
      next(err);
    }
  },
];
