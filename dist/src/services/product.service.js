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
exports.modifyCommentInProduct = exports.updateProduct = exports.deleteImages = exports.deleteProduct = exports.addProduct = exports.getProductByName = exports.getProductById = exports.getAllProducts = void 0;
// Models
const product_model_1 = __importDefault(require("../models/product.model"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getAllProducts = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.find()
        .skip((page - 1) * perPage)
        .limit(perPage * 1)
        .exec();
});
exports.getAllProducts = getAllProducts;
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOne({ id }, null, { lean: true });
});
exports.getProductById = getProductById;
const getProductByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOne({ name }, null, { lean: true });
});
exports.getProductByName = getProductByName;
const addProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.create(payload);
});
exports.addProduct = addProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOneAndDelete({ _id: id });
});
exports.deleteProduct = deleteProduct;
const deleteImages = (images) => {
    if (images.length > 0) {
        // Delete uploaded images if product creation fails
        images.forEach((image) => {
            fs_1.default.unlink(path_1.default.join(__dirname, `../../public/images/products/${image}`), (err) => {
                if (err)
                    console.log(err);
            });
        });
    }
};
exports.deleteImages = deleteImages;
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.default.findOneAndUpdate({ _id: id }, payload);
});
exports.updateProduct = updateProduct;
const modifyCommentInProduct = (id, payload, action) => __awaiter(void 0, void 0, void 0, function* () {
    switch (action) {
        case "ADD":
            return yield product_model_1.default.findOneAndUpdate({ _id: id }, { $push: { comments: payload } }, { new: true });
        case "DELETE":
            return yield product_model_1.default.findOneAndUpdate({ _id: id }, { $pull: { products: payload } }, { new: true });
        default:
            return null;
    }
});
exports.modifyCommentInProduct = modifyCommentInProduct;
//# sourceMappingURL=product.service.js.map