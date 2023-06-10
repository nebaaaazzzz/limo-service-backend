"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _blogroutes = /*#__PURE__*/ _interop_require_default(require("./blog.routes"));
const _vehicleroutes = /*#__PURE__*/ _interop_require_default(require("./vehicle.routes"));
const _bookroutes = /*#__PURE__*/ _interop_require_default(require("./book.routes"));
const _authroutes = /*#__PURE__*/ _interop_require_default(require("./auth.routes"));
const _userroutes = /*#__PURE__*/ _interop_require_default(require("./user.routes"));
const _error = require("../util/error");
const _db = require("../config/db");
const _auth = require("../util/auth");
const _mail = require("../config/mail");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
router.use("/auth", _authroutes.default);
router.use("/blog", _blogroutes.default);
router.use("/book", _bookroutes.default);
router.use("/user", (0, _error.catchAsync)(_auth.isAuth), _userroutes.default);
router.use("/vehicle", _vehicleroutes.default);
router.post("/mail", async (req, res)=>{
    const { name , email , phone , message  } = req.body;
    await (0, _mail.sendMail)({
        name,
        email,
        phone,
        message
    });
    res.send("success");
});
router.get("/stat", async (req, res)=>{
    const numberOfPendingReservation = await _db.Book.count({
        where: {
            status: "PENDING"
        }
    });
    const numberOfCompletedReservation = await _db.Book.count({
        where: {
            status: "COMPLETED"
        }
    });
    const numberOfReservation = await _db.Book.count();
    const numberOfRejectedReservation = await _db.Book.count({
        where: {
            status: "REJECTED"
        }
    });
    const numberOfBlogs = await _db.Blog.count();
    const numberOfVehicle = await _db.Vehicle.count();
    const numberOfNewReservation = await _db.Book.count({
        where: {
            createdAt: {
                gte: new Date(new Date().getTime() - 12 * 60 * 60 * 1000)
            }
        }
    });
    res.send({
        numberOfPendingReservation,
        numberOfCompletedReservation,
        numberOfRejectedReservation,
        numberOfBlogs,
        numberOfReservation,
        numberOfVehicle,
        numberOfNewReservation
    });
});
router.get("/me", (0, _error.catchAsync)(_auth.isAuth), (0, _error.catchAsync)(async (req, res)=>{
    return res.json(req.user);
}));
const _default = router;
