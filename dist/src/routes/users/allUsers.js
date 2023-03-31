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
exports.allUsersRouter = void 0;
const express_1 = __importDefault(require("express"));
// Services
const user_service_1 = require("../../services/user.service");
// Errors
const generic_error_1 = require("../../errors/generic-error");
const adminAuth_1 = require("../../middlewares/adminAuth");
const user_model_1 = __importDefault(require("../../models/user.model"));
const router = express_1.default.Router();
exports.allUsersRouter = router;
router.get("/api/private/users", adminAuth_1.adminAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, perPage = 10 } = req.query;
    if (page < 1 || perPage < 1)
        throw new generic_error_1.GenericError("page and perPage must be at least 1", 400);
    const users = yield (0, user_service_1.getAllUsers)(page, perPage);
    const count = yield user_model_1.default.countDocuments();
    const totalPages = Math.ceil(count / (perPage * 1));
    const pagination = {
        count,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
    res.status(200).send({
        status: "success",
        data: users,
        pagination,
    });
}));
//# sourceMappingURL=allUsers.js.map