//@ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    postVehicle: function() {
        return postVehicle;
    },
    getVehicles: function() {
        return getVehicles;
    },
    getVehicle: function() {
        return getVehicle;
    },
    deleteVehicle: function() {
        return deleteVehicle;
    },
    updateVehicle: function() {
        return updateVehicle;
    }
});
const _promises = require("fs/promises");
const _vehicleschema = require("../validation_schemas/vehicle.schema");
const _multer = /*#__PURE__*/ _interop_require_default(require("../config/multer"));
const _db = require("../config/db");
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _error = require("../util/error");
const _CustomeError = /*#__PURE__*/ _interop_require_default(require("../util/CustomeError"));
const _cloudinary = /*#__PURE__*/ _interop_require_default(require("../config/cloudinary"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const uploads = _multer.default.single("img");
const postVehicle = [
    uploads,
    async (req, res, next)=>{
        try {
            const value = await _vehicleschema.VehiclePostschema.validateAsync({
                ...req.body,
                userId: req.user?.id,
                img: req.file?.filename
            });
            const publicId = await (0, _cloudinary.default)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            const car = await _db.Vehicle.create({
                data: {
                    ...value,
                    img: publicId
                }
            });
            return res.send(car);
        } catch (err) {
            if (req.file?.filename) {
                //if the validation fails, delete the uploaded file
                await (0, _promises.rm)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    }
];
const getVehicles = (0, _error.catchAsync)(async (req, res, next)=>{
    const page = Number(req.query?.page) || 1;
    const PAGE_SIZE = 6;
    const limit = Number(req.query?.limit) || PAGE_SIZE;
    const results = await _db.Vehicle.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
            user: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    res.send(results);
});
const getVehicle = (0, _error.catchAsync)(async (req, res, next)=>{
    const carId = req.params.id;
    const car = await _db.Vehicle.findUnique({
        where: {
            id: carId
        }
    });
    if (!car) {
        return next(new _CustomeError.default("Vehicle not found", 404));
    }
    res.send(car);
});
const deleteVehicle = (0, _error.catchAsync)(async (req, res, next)=>{
    const carId = req.params.id;
    const car = await _db.Vehicle.findUnique({
        where: {
            id: carId
        }
    });
    if (!car) {
        return next(new _CustomeError.default("Vehicle not found", 404));
    }
    await _db.Vehicle.delete({
        where: {
            id: carId
        }
    });
    res.send("car deleted");
});
const updateVehicle = [
    uploads,
    async (req, res, next)=>{
        try {
            const carId = req.params.id;
            const car = await _db.Vehicle.findUnique({
                where: {
                    id: carId
                }
            });
            if (!car) {
                return next(new _CustomeError.default("Vehicle not found", 404));
            }
            const body = req.body;
            if (req.file) {
                const publicId = await (0, _cloudinary.default)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
                body["img"] = publicId;
            }
            const value = await _vehicleschema.VehicleUpdateschema.validateAsync(body);
            const updatedCar = await _db.Vehicle.update({
                where: {
                    id: carId
                },
                data: value
            });
            res.send(updatedCar);
        } catch (err) {
            if (req.file?.filename) {
                //if the validation fails, delete the uploaded file
                await (0, _promises.rm)(_path.default.join(__dirname, "../uploads/", req.file?.filename));
            }
            next(err);
        }
    }
];
