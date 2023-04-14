import { Router } from "express";
import {
  deleteReservation,
  getReservation,
  getReservations,
  postReservation,
  updateReservation,
} from "../controller/book.controller";
const router = Router();
router.route("/").post(postReservation).get(getReservations);
router
  .route("/:id")
  .delete(deleteReservation)
  .patch(updateReservation)
  .get(getReservation);
export default router;
