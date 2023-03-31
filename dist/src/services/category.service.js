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
exports.deleteCategory = exports.modifyProductInCategory = exports.updateCategory = exports.addCategory = exports.getCategoryById = exports.getCategoryByName = exports.getAllCategories = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.find();
});
exports.getAllCategories = getAllCategories;
const getCategoryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findOne({ name }, null, { lean: true });
});
exports.getCategoryByName = getCategoryByName;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findOne({ id }, null, { lean: true });
});
exports.getCategoryById = getCategoryById;
const addCategory = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.create({ name, description });
});
exports.addCategory = addCategory;
const updateCategory = (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findOneAndUpdate({ id }, { name, description }, { new: true });
});
exports.updateCategory = updateCategory;
const modifyProductInCategory = (id, productId, action) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_model_1.default.findOne({ _id: id });
    if (!category)
        return false;
    switch (action) {
        case "ADD":
            return yield category_model_1.default.findOneAndUpdate({ _id: id }, { $push: { products: productId } }, { new: true });
        case "DELETE":
            return yield category_model_1.default.findOneAndUpdate({ _id: id }, { $pull: { products: productId } }, { new: true });
        default:
            return null;
    }
});
exports.modifyProductInCategory = modifyProductInCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield category_model_1.default.findOneAndRemove({ _id: id });
});
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=category.service.js.map