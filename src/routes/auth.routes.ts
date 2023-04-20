import { Router } from "express";
import passport from "passport";
import { generateToken } from "../util/token";
const router = Router();
router.post(
  "/login",
  passport.authenticate("local", {
    session: false,
  }),
  async function (req, res) {
    const token = await generateToken(req.user as User);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    res.send({
      data: {
        message: "succeeessfuly loggedIn",
      },
    });
  }
);

export default router;
