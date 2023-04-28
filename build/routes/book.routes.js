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
const _bookcontroller = require("../controller/book.controller");
const _error = require("../util/error");
const _auth = require("../util/auth");
const router = (0, _express.Router)();
router.route("/").post(_bookcontroller.postReservation).get((0, _error.catchAsync)(_auth.isAuth), _bookcontroller.getReservations);
router.route("/:id").delete((0, _error.catchAsync)(_auth.isAuth), _bookcontroller.deleteReservation).patch((0, _error.catchAsync)(_auth.isAuth), _bookcontroller.updateReservation).get((0, _error.catchAsync)(_auth.isAuth), _bookcontroller.getReservation);
const _default = router;
