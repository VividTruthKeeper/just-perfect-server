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
exports.updateUserAddressRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const user_service_1 = require("../../services/user.service");
const generic_error_1 = require("../../errors/generic-error");
const router = express_1.default.Router();
exports.updateUserAddressRouter = router;
router.put("/api/users/:id/address", [
    (0, express_validator_1.body)("address")
        .isObject()
        .withMessage("A valid address info must be provided"),
    (0, express_validator_1.param)("id")
        .isLength({ min: 24, max: 24 })
        .withMessage("Received an invalid user ID"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const address = req.body;
    if (!(address.street &&
        address.state &&
        address.city &&
        address.zipCode &&
        address.country))
        throw new generic_error_1.GenericError("A valid address info must be provided", 400);
    const user = yield (0, user_service_1.findUser)({ _id: id });
    if (!user)
        throw new generic_error_1.GenericError("Could not find user", 404);
    const updatedUser = yield (0, user_service_1.updateUserAddress)(id, address);
    res.status(200).send({
        status: "success",
        data: updatedUser,
    });
}));
//# sourceMappingURL=updateUserAddress.js.map