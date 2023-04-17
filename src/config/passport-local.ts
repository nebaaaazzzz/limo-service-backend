// var passport = require('passport');
// var LocalStrategy = require('passport-local');

import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./db";
import { compare } from "bcrypt";
passport.use(
  new Strategy(async function verify(email, password, cb) {
    try {
      const user = await User.findUnique({ where: { email } });
      if (!user) {
        return cb(null, false, { message: "user not found" });
      }
      const valid = await compare(password, user.password);
      if (!valid) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      return cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);
