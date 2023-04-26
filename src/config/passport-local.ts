import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { User as Usr } from "./db";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import CustomError from "../util/CustomeError";
export default function (passport: PassportStatic) {
  passport.use(
    new Strategy(
      {
        usernameField: "email",
        session: false,
      },
      async function verify(email, password, cb) {
        try {
          const user = await Usr.findUnique({ where: { email } });
          if (!user) {
            return cb(new CustomError("user not found.", 404), false, {
              message: "user not found",
            });
          }
          const valid = await compare(password, user.password);
          if (!valid) {
            return cb(
              new CustomError("Incorrect username or password.", 400),
              false
            );
          }
          let temp = user as User;
          temp.password = "";
          return cb(null, user);
        } catch (err) {
          cb(err);
        }
      }
    )
  );
}
