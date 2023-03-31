"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    products: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Product" }],
    __v: { type: Number, select: false },
}, { timestamps: true, strictQuery: false });
exports.default = (0, mongoose_1.model)("Category", categorySchema);
//# sourceMappingURL=category.model.js.map