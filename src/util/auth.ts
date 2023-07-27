import { User } from "../config/db";
import { verifyToken } from "./token";
import { Request, Response, NextFunction } from "express";
export async function isAuth(req: Request, res: Response, next: NextFunction) {
  const decodedToken = await verifyToken(req.cookies.token);

  const user = await User.findUniqueOrThrow({
    where: {
      id: decodedToken.sub,
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      id: true,
      updatedAt: true,
      img: true,
      createdAt: true,
    },
  });
  req.user = user;
  next();
}
