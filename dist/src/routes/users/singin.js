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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
// Functions
const createToken_1 = __importDefault(require("../../functions/createToken"));
const sanitizeUser_1 = __importDefault(require("../../functions/sanitizeUser"));
// Services
const user_service_1 = require("../../services/user.service");
// Errors
const request_validation_error_1 = require("../../errors/request-validation-error");
const generic_error_1 = require("../../errors/generic-error");
const router = express_1.default.Router();
exports.signinRouter = router;
router.post("/api/users/signIn", [(0, express_validator_1.body)("email").isEmail().withMessage("Invalid email")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    let updatedUser = null;
    const { email, password, adminPassword } = req.body;
    const sanitizedEmail = email.toLowerCase();
    const { passwordCorrect } = yield (0, user_service_1.loginUser)({
        email: sanitizedEmail,
        password,
    });
    const isAdmin = adminPassword === process.env.ADMIN_PASSWORD;
    if (adminPassword) {
        if (!isAdmin)
            res.status(403).send({
                errors: [
                    { message: "Access denied", reason: "Wrong admin password" },
                ],
            });
    }
    if (passwordCorrect) {
        const token = isAdmin
            ? yield (0, createToken_1.default)(sanitizedEmail, "admin")
            : yield (0, createToken_1.default)(sanitizedEmail);
        updatedUser = yield (0, user_service_1.assignToken)(email, token);
        res.status(200).send({
            status: "success",
            user: (0, sanitizeUser_1.default)(updatedUser),
        });
    }
    else {
        throw new generic_error_1.GenericError("Incorrect password", 401);
    }
}));
//# sourceMappingURL=singin.js.map