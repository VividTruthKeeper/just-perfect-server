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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentById = exports.getComments = exports.addComment = void 0;
const comment_model_1 = require("../models/comment.model");
const addComment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_model_1.Comment.create({
        user: {
            id: payload.user.id,
            firstName: payload.user.firstName,
            lastName: payload.user.lastName,
        },
        product: payload.productId,
        content: payload.content,
        rating: payload.rating,
    });
});
exports.addComment = addComment;
const getComments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_model_1.Comment.find();
});
exports.getComments = getComments;
const getCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield comment_model_1.Comment.findOne({ _id: id });
});
exports.getCommentById = getCommentById;
//# sourceMappingURL=comment.service.js.map