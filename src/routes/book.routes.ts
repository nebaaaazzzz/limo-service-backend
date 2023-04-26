import { Router } from "express";
import {
  deleteReservation,
  getReservation,
  getReservations,
  postReservation,
  updateReservation,
} from "../controller/book.controller";
import { catchAsync } from "../util/error";
import { isAuth } from "../util/auth";
const router = Router();
router
  .route("/")
  .post(postReservation)
  .get(catchAsync(isAuth), getReservations);
router
  .route("/:id")
  .delete(catchAsync(isAuth), deleteReservation)
  .patch(catchAsync(isAuth), updateReservation)
  .get(catchAsync(isAuth), getReservation);
export default router;
