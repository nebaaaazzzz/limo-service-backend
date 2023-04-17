import { Router } from "express";
const router = Router();
import blogRouter from "./blog.routes";
import vehicleRouter from "./vehicle.routes";
import bookRouter from "./book.routes";

router.use("/blog", blogRouter);
router.use("/book", bookRouter);
router.use("/vehicle", vehicleRouter);

export default router;
