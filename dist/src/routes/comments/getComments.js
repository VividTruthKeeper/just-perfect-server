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
exports.getCommentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const adminAuth_1 = require("../../middlewares/adminAuth");
const comment_service_1 = require("../../services/comment.service");
const router = express_1.default.Router();
exports.getCommentsRouter = router;
router.get("/api/comments", adminAuth_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({
        status: "success",
        data: yield (0, comment_service_1.getComments)(),
    });
}));
router.get("/api/comments/:id", [
    (0, express_validator_1.param)("id")
        .isLength({ min: 24, max: 24 })
        .withMessage("Received invalid comment ID"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).send({
        status: "success",
        data: (yield (0, comment_service_1.getCommentById)(id)) || {},
    });
}));
//# sourceMappingURL=getComments.js.map