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
exports.deleteProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../../errors/request-validation-error");
const product_service_1 = require("../../services/product.service");
const generic_error_1 = require("../../errors/generic-error");
const category_service_1 = require("../../services/category.service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const adminAuth_1 = require("../../middlewares/adminAuth");
const router = express_1.default.Router();
exports.deleteProductRouter = router;
router.delete("/api/products/delete", adminAuth_1.adminAuth, [(0, express_validator_1.body)("id").exists().withMessage("Product id must be provided")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { id } = req.body;
    const deletedProduct = yield (0, product_service_1.deleteProduct)(id);
    if (!deletedProduct)
        throw new generic_error_1.GenericError("Product not found", 404);
    const updatedCategory = (0, category_service_1.modifyProductInCategory)(deletedProduct.category, deletedProduct.id, "DELETE");
    if (deletedProduct.images.length > 0) {
        // Delete uploaded images if product creation fails
        try {
            deletedProduct.images.forEach((image) => {
                fs_1.default.unlink(path_1.default.join(__dirname, `../../../public/images/products/${image}`), (err) => {
                    if (err)
                        console.log(err);
                });
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    res.status(200).send({
        status: "success",
        data: deletedProduct,
    });
}));
//# sourceMappingURL=deleteProduct.js.map