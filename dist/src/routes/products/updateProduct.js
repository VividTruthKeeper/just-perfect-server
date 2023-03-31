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
exports.updateProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../../errors/request-validation-error");
const generic_error_1 = require("../../errors/generic-error");
const product_service_1 = require("../../services/product.service");
const adminAuth_1 = require("../../middlewares/adminAuth");
const router = express_1.default.Router();
exports.updateProductRouter = router;
router.put("/api/products/update/:id", adminAuth_1.adminAuth, [
    (0, express_validator_1.body)("name").exists().withMessage("Product name must be provided"),
    (0, express_validator_1.body)("description")
        .exists()
        .withMessage("Product description must be provided"),
    (0, express_validator_1.body)("price").exists().withMessage("Product price must be provided"),
    (0, express_validator_1.param)("id")
        .isLength({ min: 24, max: 24 })
        .withMessage("Received invalid product ID"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { name, description, price } = req.body;
    const { id } = req.params;
    // update product
    const updatedProduct = yield (0, product_service_1.updateProduct)(id, {
        name,
        description,
        price,
    });
    // if failed, throw a 500 error
    if (!updatedProduct)
        throw new generic_error_1.GenericError("Could not update product", 500);
    // send response if ok
    res.status(200).send({
        status: "success",
        data: updatedProduct,
    });
}));
//# sourceMappingURL=updateProduct.js.map