"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenError = void 0;
const custom_error_1 = require("./custom-error");
class TokenError extends custom_error_1.CustomError {
    constructor() {
        super("Token is either expired, invalid, or was not provided");
        this.statusCode = 401;
        this.reason = "Token is either expired, invalid, or was not provided";
        Object.setPrototypeOf(this, TokenError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.TokenError = TokenError;
//# sourceMappingURL=token-error.js.map