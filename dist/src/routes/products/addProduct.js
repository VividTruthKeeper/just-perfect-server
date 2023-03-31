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
exports.addProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const request_validation_error_1 = require("../../errors/request-validation-error");
const product_service_1 = require("../../services/product.service");
const upload_1 = require("../../middlewares/upload");
const generic_error_1 = require("../../errors/generic-error");
const category_service_1 = require("../../services/category.service");
const adminAuth_1 = require("../../middlewares/adminAuth");
const router = express_1.default.Router();
exports.addProductRouter = router;
router.post("/api/products/add", adminAuth_1.adminAuth, upload_1.upload.array("images"), [
    (0, express_validator_1.body)("name").exists().withMessage("Product name must be provided"),
    (0, express_validator_1.body)("description")
        .exists()
        .withMessage("Product descriprion must be provided"),
    (0, express_validator_1.body)("price").exists().withMessage("Product price must be provided"),
    (0, express_validator_1.body)("category").exists().withMessage("Product category must be provided"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const images = req.files.map((file) => file.filename);
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        (0, product_service_1.deleteImages)(images);
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    if (((_a = req.files) === null || _a === void 0 ? void 0 : _a.length) === 0)
        throw new generic_error_1.GenericError("Product images must be provided", 400);
    const { name, description, price, category } = req.body;
    if (category.length !== 24) {
        throw new generic_error_1.GenericError("A valid category ID must be provided", 400);
    }
    const newProduct = yield (0, product_service_1.addProduct)({
        name,
        description,
        price,
        category,
        images,
    });
    if (!newProduct) {
        (0, product_service_1.deleteImages)(images);
        throw new generic_error_1.GenericError("Product could not be created", 500);
    }
    const updatedCategory = (0, category_service_1.modifyProductInCategory)(category, newProduct.id, "ADD");
    if ((yield updatedCategory) === false) {
        newProduct.delete();
        (0, product_service_1.deleteImages)(images);
        throw new generic_error_1.GenericError("Category not found", 400);
    }
    res.status(201).send({
        status: "success",
        data: newProduct,
    });
}));
//# sourceMappingURL=addProduct.js.map