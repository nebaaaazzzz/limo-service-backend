// var passport = require('passport');
// var LocalStrategy = require('passport-local');

import passport, { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import { User as Usr } from "./db";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
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
            return cb(null, false, { message: "user not found" });
          }
          const valid = await compare(password, user.password);
          if (!valid) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
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
