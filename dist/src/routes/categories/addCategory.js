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
exports.addCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const adminAuth_1 = require("../../middlewares/adminAuth");
const generic_error_1 = require("../../errors/generic-error");
const request_validation_error_1 = require("../../errors/request-validation-error");
const category_service_1 = require("../../services/category.service");
const router = express_1.default.Router();
exports.addCategoryRouter = router;
router.post("/api/categories/add", adminAuth_1.adminAuth, [(0, express_validator_1.body)("name").exists().withMessage("Category name must be provided")], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { name, description } = req.body;
    if (yield (0, category_service_1.getCategoryByName)(name)) {
        throw new generic_error_1.GenericError("Category with the same name already exists", 409);
    }
    const newCategory = yield (0, category_service_1.addCategory)(name, description || null);
    res.status(201).send({
        status: "success",
        data: newCategory,
    });
}));
//# sourceMappingURL=addCategory.js.map