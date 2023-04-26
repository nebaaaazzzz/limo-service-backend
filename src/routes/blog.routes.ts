import { Router } from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  postBlog,
  updateBlog,
} from "../controller/blog.controller";
import { catchAsync } from "../util/error";
import { isAuth } from "../util/auth";
const router = Router();
router.route("/").post(catchAsync(isAuth), postBlog).get(getBlogs);
router
  .route("/:id")
  .delete(catchAsync(isAuth), deleteBlog)
  .patch(catchAsync(isAuth), updateBlog)
  .get(getBlog);
export default router;
