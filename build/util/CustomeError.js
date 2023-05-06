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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class CustomError extends Error {
    constructor(message, statusCode = 400){
        super(message);
        _define_property(this, "statusCode", void 0);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
const _default = CustomError;
