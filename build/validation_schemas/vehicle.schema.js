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
    VehiclePostschema: function() {
        return VehiclePostschema;
    },
    VehicleUpdateschema: function() {
        return VehicleUpdateschema;
    }
});
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
const _client = require("@prisma/client");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const VehiclePostschema = _joi.default.object({
    name: _joi.default.string().required(),
    model: _joi.default.string().required(),
    img: _joi.default.string().required(),
    description: _joi.default.string().required(),
    automatic: _joi.default.number().required(),
    heatedSeat: _joi.default.number().required(),
    gpsNavigation: _joi.default.number().required(),
    speed: _joi.default.number().required().min(0),
    passengerSize: _joi.default.number().required().min(0),
    userId: _joi.default.string().required(),
    pricePerDay: _joi.default.number().required().min(0),
    type: _joi.default.string().required().allow(...Object.values(_client.VehicleType))
});
const VehicleUpdateschema = _joi.default.object({
    name: _joi.default.string(),
    model: _joi.default.string(),
    img: _joi.default.string(),
    description: _joi.default.string(),
    speed: _joi.default.number().min(0),
    passengerSize: _joi.default.number().min(0),
    pricePerDay: _joi.default.number().min(0),
    automatic: _joi.default.number(),
    heatedSeat: _joi.default.number(),
    gpsNavigation: _joi.default.number(),
    userId: _joi.default.string(),
    type: _joi.default.string().allow(...Object.values(_client.VehicleType))
});
