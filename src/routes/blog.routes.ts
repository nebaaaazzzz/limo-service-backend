import { Router } from "express";
import {
  deleteBlog,
  getBlog,
  getBlogs,
  postBlog,
  updateBlog,
} from "../controller/blog.controller";
const router = Router();
router.route("/").post(postBlog).get(getBlogs);
router.route("/:id").delete(deleteBlog).patch(updateBlog).get(getBlog);
export default router;
