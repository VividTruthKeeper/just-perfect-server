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
exports.getCategoriesRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const category_service_1 = require("../../services/category.service");
const router = express_1.default.Router();
exports.getCategoriesRouter = router;
router.get("/api/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({
        status: "success",
        data: yield (0, category_service_1.getAllCategories)(),
    });
}));
router.get("/api/categories/:id", [
    (0, express_validator_1.param)("id")
        .isLength({ min: 24, max: 24 })
        .withMessage("Received invalid category ID"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).send({
        status: "success",
        data: (yield (0, category_service_1.getCategoryById)(id)) || {},
    });
}));
//# sourceMappingURL=getCategories.js.map