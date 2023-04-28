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
const _vehiclecontroller = require("../controller/vehicle.controller");
const _error = require("../util/error");
const _auth = require("../util/auth");
const router = (0, _express.Router)();
router.route("/").post((0, _error.catchAsync)(_auth.isAuth), _vehiclecontroller.postVehicle).get(_vehiclecontroller.getVehicles);
router.route("/:id").delete((0, _error.catchAsync)(_auth.isAuth), _vehiclecontroller.deleteVehicle).patch((0, _error.catchAsync)(_auth.isAuth), (0, _error.catchAsync)(_auth.isAuth), _vehiclecontroller.updateVehicle).get(_vehiclecontroller.getVehicle);
const _default = router;
