import { Router } from "express";
const router = Router();
import blogRouter from "./blog.routes";
import carRouter from "./car.routes";
import bookRouter from "./book.routes";

router.use("blog", blogRouter);

router.use("book", bookRouter);
router.use("car", carRouter);

export default router;
