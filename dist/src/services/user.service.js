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
exports.updateUserPaymentInfo = exports.updateUserAddress = exports.deleteAllUsers = exports.getAllUsers = exports.loginUser = exports.assignToken = exports.findUser = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generic_error_1 = require("../errors/generic-error");
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.create(input);
});
exports.createUser = createUser;
const findUser = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOne(query, null, options);
});
exports.findUser = findUser;
const assignToken = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOneAndUpdate({ email }, { token }, { new: true });
    if (!user)
        throw new generic_error_1.GenericError("User not found", 404);
    return user;
});
exports.assignToken = assignToken;
const loginUser = ({ email, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, exports.findUser)({ email }, { lean: false });
    if (!user) {
        throw new generic_error_1.GenericError("User not found", 404);
    }
    const passwordCorrect = yield user.comparePassword(password);
    return { passwordCorrect, user };
});
exports.loginUser = loginUser;
const getAllUsers = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.find()
        .skip((page - 1) * perPage)
        .limit(perPage * 1)
        .exec();
});
exports.getAllUsers = getAllUsers;
const deleteAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.default.deleteMany({});
});
exports.deleteAllUsers = deleteAllUsers;
const updateUserAddress = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndUpdate({ _id: id }, { address: payload }, { new: true });
});
exports.updateUserAddress = updateUserAddress;
const updateUserPaymentInfo = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.default.findOneAndUpdate({ _id: id }, { paymentInfo: payload }, { new: true });
});
exports.updateUserPaymentInfo = updateUserPaymentInfo;
//# sourceMappingURL=user.service.js.map