// var JwtStrategy = require('passport-jwt').Strategy,

import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

var opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
  issuer: "accounts.limoservice.com",
  audience: "limoservice.com",
};
passport.use(
  new Strategy(opts, function (jwt_payload, done) {
    // User.findOne({ id: jwt_payload.sub }, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });
  })
);
