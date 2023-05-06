"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _indexroutes = /*#__PURE__*/ _interop_require_default(require("./routes/index.routes"));
const _error = require("./util/error");
const _expressratelimit = /*#__PURE__*/ _interop_require_default(require("express-rate-limit"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _passportlocal = /*#__PURE__*/ _interop_require_default(require("./config/passport-local"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _passport = /*#__PURE__*/ _interop_require_default(require("passport"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
//import { User } from "./config/db";
// (async () => {
//   await User.create({
//     data: {
//       email: "neba@gmail.com",
//       lastName: "Daniel",
//       firstName: "Nebiyu",
//       password: "$2a$10$EZq8FjlPlFQJtctyPFfOfuYBRf1SAb57C/Kj1AzKUrgFfpSpzAQSG",
//       // password: "123456",
//     },
//   });
// })();
const app = (0, _express.default)();
app.use(_express.default.static(_path.default.join(__dirname, "uploads")));
app.use(_express.default.json());
app.use((0, _cors.default)());
app.use((0, _cookieparser.default)());
app.use(_passport.default.initialize({}));
app.use(_indexroutes.default);
app.use((0, _expressratelimit.default)());
app.listen(4000, ()=>{
    console.log("Server started on port 4000");
});
(0, _passportlocal.default)(_passport.default);
app.use(_error.globalErrorHandler);
process.on("unhandledRejection", (err)=>{
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    process.exit(1);
});
process.on("uncaughtException", (err)=>{
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1);
});
