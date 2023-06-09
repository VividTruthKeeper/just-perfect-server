"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Errors
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    if (!res.statusCode)
        return next();
    else
        res.status(400).send({
            errors: [{ message: "Something went wrong" }],
        });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map