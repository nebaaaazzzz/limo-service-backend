import { Router } from "express";
import {
  deleteVehicle,
  getVehicles,
  getVehicle,
  postVehicle,
  updateVehicle,
} from "../controller/vehicle.controller";
const router = Router();
router.route("/").post(postVehicle).get(getVehicles);
router.route("/:id").delete(deleteVehicle).patch(updateVehicle).get(getVehicle);

export default router;
