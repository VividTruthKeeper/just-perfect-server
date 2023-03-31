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
exports.addItemtoCartRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const generic_error_1 = require("../../errors/generic-error");
const handleToken_1 = require("../../functions/handleToken");
const cart_model_1 = require("../../models/cart.model");
const request_validation_error_1 = require("../../errors/request-validation-error");
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const router = express_1.default.Router();
exports.addItemtoCartRouter = router;
router.post("/api/cart/items", [
    (0, express_validator_1.query)("token").exists().withMessage("A valid token must be provided"),
    (0, express_validator_1.body)("productId")
        .notEmpty()
        .custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
        .withMessage("A valid product ID must be provided"),
    (0, express_validator_1.body)("quantity")
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
    (0, express_validator_1.body)("userId")
        .notEmpty()
        .custom((value) => mongoose_1.default.Types.ObjectId.isValid(value))
        .withMessage("A valid user ID must be provided"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    // Handle token
    const { token } = req.query;
    const decodedToken = yield (0, handleToken_1.handleToken)(token);
    if (!decodedToken)
        throw new generic_error_1.GenericError("Unhadled token error", 500);
    const { productId, quantity, userId } = req.body;
    // Find the user's cart
    let cart = yield cart_model_1.Cart.findOne({ user: userId });
    // If the user's cart doesn't exist, create a new one
    if (!cart) {
        cart = yield cart_model_1.Cart.create({ user: userId, items: [] });
    }
    // Check if product exists
    const product = yield product_model_1.default.findOne({ _id: productId });
    if (!product)
        throw new generic_error_1.GenericError("Could not find product", 400);
    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) => item.product.equals(productId));
    if (existingItem) {
        // If the product is already in the cart, update the quantity and price
        existingItem.quantity += quantity;
        existingItem.price = existingItem.quantity * product.price;
    }
    else {
        // If the product is not already in the cart, add it as a new item
        const newItem = {
            product: productId,
            quantity: quantity,
            price: product.price * quantity,
        };
        cart.items.push(newItem);
    }
    // Save the updated cart
    yield cart.save();
    res.status(201).send({
        status: "success",
        data: cart,
    });
}));
//# sourceMappingURL=addItemtoCart.js.map