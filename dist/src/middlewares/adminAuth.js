"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
const token_error_1 = require("../errors/token-error");
const generic_error_1 = require("../errors/generic-error");
const handleAdminToken_1 = require("../functions/handleAdminToken");
const adminAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    if (!token)
        throw new token_error_1.TokenError();
    const status = yield (0, handleAdminToken_1.handleAdminToken)(token);
    if (!status)
        throw new generic_error_1.GenericError("Access denied", 403);
    next();
});
exports.adminAuth = adminAuth;
//# sourceMappingURL=adminAuth.js.map