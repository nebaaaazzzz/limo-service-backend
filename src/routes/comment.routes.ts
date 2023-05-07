import { Router } from "express";
import {
  deleteComment,
  getComment,
  getComments,
  postComment,
} from "../controller/comment.controller";
import { catchAsync } from "../util/error";
import { isAuth } from "../util/auth";
const router = Router();
router.get("/:blogId", getComments);
router.post("/", postComment);
router.route("/:id").delete(catchAsync(isAuth), deleteComment).get(getComment);
export default router;
