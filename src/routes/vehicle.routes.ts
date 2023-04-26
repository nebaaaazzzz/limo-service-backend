import { Router } from "express";
import {
  deleteVehicle,
  getVehicles,
  getVehicle,
  postVehicle,
  updateVehicle,
} from "../controller/vehicle.controller";
import { catchAsync } from "../util/error";
import { isAuth } from "../util/auth";
const router = Router();
router.route("/").post(catchAsync(isAuth),postVehicle).get(getVehicles);
router
  .route("/:id")
  .delete(catchAsync(isAuth), deleteVehicle)
  .patch(catchAsync(isAuth), catchAsync(isAuth), updateVehicle)
  .get(getVehicle);

export default router;
