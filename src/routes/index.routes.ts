import { Request, Response, Router } from "express";
const router = Router();
import blogRouter from "./blog.routes";
import vehicleRouter from "./vehicle.routes";
import bookRouter from "./book.routes";
import authRouter from "./auth.routes";
import { catchAsync } from "../util/error";
import { verifyToken } from "../util/token";
import { User } from "../config/db";

router.use("/auth", authRouter);
router.use("/blog", blogRouter);
router.use("/book", bookRouter);
router.use("/vehicle", vehicleRouter);
router.get(
  "/me",
  catchAsync(async (req: Request, res: Response) => {
    const decodedToken = await verifyToken(req.cookies.token);
    const user = await User.findUnique({
      where: {
        id: Number(decodedToken.sub),
      },
      select: {
        email: true,
        firstName: true,
        lastName: true,
        id: true,
        createdAt: true,
        phoneNumber: true,
      },
    });
    res.json(user);
  })
);
export default router;
