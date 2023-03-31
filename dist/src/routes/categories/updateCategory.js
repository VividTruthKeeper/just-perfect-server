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
exports.updateCategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const category_service_1 = require("../../services/category.service");
const request_validation_error_1 = require("../../errors/request-validation-error");
const adminAuth_1 = require("../../middlewares/adminAuth");
const router = express_1.default.Router();
exports.updateCategoryRouter = router;
router.put("/api/categories/update/:id", adminAuth_1.adminAuth, [
    (0, express_validator_1.body)("name")
        .isLength({ min: 3, max: 15 })
        .withMessage("First name must be between 3 and 20 characters"),
    (0, express_validator_1.param)("id")
        .isLength({ min: 24, max: 24 })
        .withMessage("Received invalid category ID"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // req params error
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new request_validation_error_1.RequestValidationError(errors.array());
    }
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        res.status(200).send({
            status: "success",
            data: yield (0, category_service_1.updateCategory)(id, name, description),
        });
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=updateCategory.js.map