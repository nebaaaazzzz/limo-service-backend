// var JwtStrategy = require('passport-jwt').Strategy,
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _passport = /*#__PURE__*/ _interop_require_default(require("passport"));
const _passportjwt = require("passport-jwt");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var opts = {
    jwtFromRequest: _passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "secret",
    issuer: "accounts.limoservice.com",
    audience: "limoservice.com"
};
_passport.default.use(new _passportjwt.Strategy(opts, function(jwt_payload, done) {
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
}));
