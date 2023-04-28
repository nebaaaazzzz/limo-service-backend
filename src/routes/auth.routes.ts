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
    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .send({
        data: {
          message: "succeeessfuly loggedIn",
        },
      });
  }
);
router.post("/logout", async function (req, res) {
  return res
    .clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "none",
    })
    .send({
      data: {
        message: "succeeessfuly loggedIn",
      },
    });
});

export default router;
