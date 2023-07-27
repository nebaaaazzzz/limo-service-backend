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
const PORT = process.env.PORT || 3030;
const app = (0, _express.default)();
app.use(_express.default.static(_path.default.join(__dirname, "uploads")));
app.use(_express.default.static(_path.default.join(__dirname, "static")));
app.use(_express.default.json());
app.use((0, _cors.default)({
    credentials: true,
    origin: [
        "https://limo-admin.onrender.com",
        "https://seattle-limo.onrender.com",
        "http://localhost:3000",
        "http://localhost:5173",
        "127.0.0.1:3000",
        "https://seattle-limos.onrender.com",
        "http://localhost",
        "127.0.0.1"
    ]
}));
app.use((0, _cookieparser.default)());
app.use(_passport.default.initialize({}));
app.use(_indexroutes.default);
app.get("*", function(req, res) {
    res.sendFile(_path.default.join(__dirname + "/static/index.html"));
});
app.use((0, _expressratelimit.default)());
app.listen(PORT, ()=>{
    console.log("Server started on port " + PORT);
});
(0, _passportlocal.default)(_passport.default);
//global error handler
app.use(_error.globalErrorHandler);
process.on("unhandledRejection", (err)=>{
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    process.exit(1);
// app.close(() => {
//   process.exit(1);
// }
// );
});
process.on("uncaughtException", (err)=>{
    console.log(err.name, err.message);
    console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1);
// app.close(() => {
//   process.exit(1);
// });
});
