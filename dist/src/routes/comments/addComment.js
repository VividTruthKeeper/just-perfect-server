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
exports.addCommentRouter = void 0;
const express_1 = __importDefault(require("express"));
const request_validation_error_1 = require("../../errors/request-validation-error");
const express_validator_1 = require("express-validator");
const comment_service_1 = require("../../services/comment.service");
const generic_error_1 = require("../../errors/generic-error");
const product_service_1 = require("../../services/product.service");
const user_service_1 = require("../../services/user.service");
const product_service_2 = require("../../services/product.service");
const router = express_1.default.Router();
exports.addCommentRouter = router;
router.post("/api/products/:productId/comments", [
    (0, express_validator_1.body)("userId")
        .isLength({ min: 24, max: 24 })
        .withMessage("A valid user ID must be provided"),
    (0, express_validator_1.body)("content").exists().withMessage("Comment content must be provided"),
    (0, express_validator_1.body)("rating")
        .exists()
        .isInt()
        .withMessage("Comment rating must be provided, and must be numeric"),
    (0, express_validator_1.param)("productId")
        .isLength({ min: 24, max: 24 })
        .withMessage("A valid product ID must be provided"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty())
        throw new request_validation_error_1.RequestValidationError(errors.array());
    const { productId } = req.params;
    const { userId, content, rating } = req.body;
    // check if product exists
    const product = yield (0, product_service_1.getProductById)(productId);
    console.log(product);
    if (!product)
        throw new generic_error_1.GenericError("Product was not found", 404);
    // check if user exists
    const user = yield (0, user_service_1.findUser)({ _id: userId });
    if (!user)
        throw new generic_error_1.GenericError("User was not found", 404);
    // Create new comment
    const newComment = yield (0, comment_service_1.addComment)({
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
        },
        productId,
        content,
        rating,
    });
    if (!newComment)
        throw new generic_error_1.GenericError("Could not add comment", 500);
    // update product
    const updatedProduct = yield (0, product_service_2.modifyCommentInProduct)(productId, {
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
        },
        content,
        rating,
    }, "ADD");
    // check if product was updated
    if (!updatedProduct) {
        // if not, delete a new comment
        newComment.delete();
        throw new generic_error_1.GenericError("Failed to update product", 500);
    }
    res.status(201).send({
        status: "success",
        data: newComment,
    });
}));
//# sourceMappingURL=addComment.js.map