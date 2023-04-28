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
    BookPostschema: function() {
        return BookPostschema;
    },
    BookUpdateschema: function() {
        return BookUpdateschema;
    }
});
const _joi = /*#__PURE__*/ _interop_require_default(require("joi"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const BookPostschema = _joi.default.object({
    firstName: _joi.default.string().min(3).max(50).required(),
    lastName: _joi.default.string().min(3).max(50).required(),
    fromAddress: _joi.default.string().min(2).required(),
    toAddress: _joi.default.string().min(2).required(),
    email: _joi.default.string().required().email(),
    phoneNumber: _joi.default.string().required(),
    luggageCount: _joi.default.number().required().min(0).integer(),
    personCount: _joi.default.number().required().min(0).integer(),
    journeyDate: _joi.default.date().required(),
    description: _joi.default.string().required(),
    vehicleId: _joi.default.number().required()
});
const BookUpdateschema = _joi.default.object({
    firstName: _joi.default.string().min(3).max(50),
    lastName: _joi.default.string().min(3).max(50),
    fromAddress: _joi.default.string().min(2),
    toAddress: _joi.default.string().min(2),
    email: _joi.default.string().email(),
    status: _joi.default.string().allow(...[
        "PENDING",
        "COMPLETED",
        "REJECTED"
    ]),
    phoneNumber: _joi.default.string().min(8).max(10),
    luggageCount: _joi.default.number().min(0).integer(),
    personCount: _joi.default.number().min(0).integer(),
    journeyDate: _joi.default.date(),
    description: _joi.default.string(),
    vehicleId: _joi.default.number()
});
