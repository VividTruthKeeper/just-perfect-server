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
exports.getProductsRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_service_1 = require("../../services/product.service");
const product_model_1 = __importDefault(require("../../models/product.model"));
const generic_error_1 = require("../../errors/generic-error");
const router = express_1.default.Router();
exports.getProductsRouter = router;
router.get("/api/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, perPage = 10 } = req.query;
    if (page < 1 || perPage < 1)
        throw new generic_error_1.GenericError("page and perPage must be at least 1", 400);
    const count = yield product_model_1.default.countDocuments();
    const totalPages = Math.ceil(count / (perPage * 1));
    const pagination = {
        count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
    res.status(200).send({
        status: "success",
        data: yield (0, product_service_1.getAllProducts)(page, perPage),
        pagination,
    });
}));
router.get("/api/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).send({
        status: "success",
        data: (yield (0, product_service_1.getProductById)(id)) || {},
    });
}));
//# sourceMappingURL=getProducts.js.map