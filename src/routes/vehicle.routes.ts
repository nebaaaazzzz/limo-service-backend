import { Router } from "express";
import {
  deleteCar,
  getCar,
  getCars,
  postCar,
  updateCar,
} from "../controller/vehicle.controller";
const router = Router();
router.route("/").post(postCar).get(getCars);
router.route("/:id").delete(deleteCar).patch(updateCar).get(getCar);

export default router;
