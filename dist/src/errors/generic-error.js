"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericError = void 0;
const custom_error_1 = require("./custom-error");
class GenericError extends custom_error_1.CustomError {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, GenericError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.GenericError = GenericError;
//# sourceMappingURL=generic-error.js.map