"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    comments: [
        {
            user: {
                id: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
                firstName: { type: String, required: true },
                lastName: { type: String, required: true },
            },
            content: { type: String, required: true },
            rating: { type: Number, required: true },
        },
    ],
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: "Category", required: true },
    __v: { type: Number, select: false },
}, { timestamps: true, strictQuery: false });
productSchema.index({ name: "text", description: "text" });
exports.default = (0, mongoose_1.model)("Product", productSchema);
//# sourceMappingURL=product.model.js.map