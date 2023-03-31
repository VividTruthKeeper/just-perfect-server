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
exports.clearCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const generic_error_1 = require("../../errors/generic-error");
const handleToken_1 = require("../../functions/handleToken");
const cart_model_1 = require("../../models/cart.model");
const request_validation_error_1 = require("../../errors/request-validation-error");
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
exports.clearCartRouter = router;
router.delete("/api/cart/items", [
    (0, express_validator_1.query)("token").exists().withMessage("A valid token must be provided"),
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
        .withMessage("A valid user ID must be provided"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const { userId } = req.body;
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const decodedToken = yield (0, handleToken_1.handleToken)(token);
    if (!decodedToken)
        throw new generic_error_1.GenericError("Unhadled token error", 500);
    const cart = yield cart_model_1.Cart.findOne({ user: userId });
    if (cart) {
        cart.items = [];
        yield cart.save();
    }
    res.status(202).send({
        status: "success",
        data: cart ? cart.items : [],
    });
}));
router.delete("/api/cart/items/:itemId", [
    (0, express_validator_1.query)("token").exists().withMessage("A valid token must be provided"),
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
        .withMessage("A valid user ID must be provided"),
    (0, express_validator_1.param)("itemId")
        .notEmpty()
        .custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
        .withMessage("A valid product ID must be provided"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    const { userId } = req.body;
    const { itemId } = req.params;
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    // Check token
    const decodedToken = yield (0, handleToken_1.handleToken)(token);
    if (!decodedToken)
        throw new generic_error_1.GenericError("Unhadled token error", 500);
    // Find the user's cart
    const cart = yield cart_model_1.Cart.findOne({ user: userId });
    // If the user's cart doesn't exist, return an error
    if (!cart)
        throw new generic_error_1.GenericError("Cart not found", 404);
    // Remove the item from the cart
    cart.items = cart.items.filter((item) => !item.product.equals(itemId));
    // Save the updated cart
    yield cart.save();
    res.status(202).send({
        status: "success",
        data: cart.items,
    });
}));
//# sourceMappingURL=clearCart.js.map