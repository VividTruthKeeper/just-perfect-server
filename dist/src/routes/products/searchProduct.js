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
exports.productSearchRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const generic_error_1 = require("../../errors/generic-error");
const router = express_1.default.Router();
exports.productSearchRouter = router;
router.get("/api/products/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, perPage = 10, search = null } = req.query;
    console.log(search);
    if (search === null)
        throw new generic_error_1.GenericError("Search query must be provided", 400);
    if (page < 1 || perPage < 1)
        throw new generic_error_1.GenericError("page and perPage must be at least 1", 400);
    // @ts-ignore
    const products = yield product_model_1.default.find({ $text: { $search: search } })
        .skip((page - 1) * perPage)
        .limit(perPage);
    //   const count = await Product.countDocuments();
    //   const totalPages = Math.ceil(count / ((perPage as any) * 1));
    //   const pagination = {
    //     count,
    //     totalPages,
    //     hasNextPage: page < totalPages,
    //     hasPrevPage: page > 1,
    //   };
    res.status(200).send({
        status: "success",
        data: products,
        // pagination,
    });
}));
//# sourceMappingURL=searchProduct.js.map