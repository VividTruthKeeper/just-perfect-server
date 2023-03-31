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
exports.signupRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
// Errors
const request_validation_error_1 = require("../../errors/request-validation-error");
const generic_error_1 = require("../../errors/generic-error");
// Services
const user_service_1 = require("../../services/user.service");
const createToken_1 = __importDefault(require("../../functions/createToken"));
const sanitizeUser_1 = __importDefault(require("../../functions/sanitizeUser"));
const router = express_1.default.Router();
exports.signupRouter = router;
router.post("/api/users/signUp", [
    (0, express_validator_1.body)("firstName")
        .isLength({ min: 3, max: 20 })
        .withMessage("First name must be between 3 and 20 characters"),
    (0, express_validator_1.body)("lastName")
        .isLength({ min: 3, max: 20 })
        .withMessage("Last name must be between 3 and 20 characters"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 8, max: 64 })
        .matches(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)
        .withMessage("Password must be between 8 and 64 characters, must contain 1 number, 1 uppercase and 1 lowercase letters, and 1 special character"),
    (0, express_validator_1.body)("address")
        .isObject()
        .withMessage("A valid address info must be provided"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { firstName, lastName, email, password, address, paymentInfo, adminPassword, } = req.body;
    const sanitizedEmail = email.toLowerCase();
    if (!(address.street &&
        address.city &&
        address.state &&
        address.zipCode &&
        address.country))
        throw new generic_error_1.GenericError("A valid address must be provided", 400);
    const userWithEmail = yield (0, user_service_1.findUser)({ email: sanitizedEmail });
    if (userWithEmail !== null) {
        throw new generic_error_1.GenericError("User already exists", 409);
    }
    const isAdmin = adminPassword === process.env.ADMIN_PASSWORD;
    const token = isAdmin
        ? yield (0, createToken_1.default)(sanitizedEmail, "admin")
        : (0, createToken_1.default)(sanitizedEmail);
    const newUser = yield (0, user_service_1.createUser)({
        email: sanitizedEmail,
        firstName,
        lastName,
        password,
        token,
        address,
        paymentInfo,
    });
    const userJSON = (0, sanitizeUser_1.default)(newUser);
    res.status(201).send({
        status: "success",
        user: userJSON,
    });
}));
//# sourceMappingURL=signup.js.map