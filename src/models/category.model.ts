import { Document, model, Schema } from "mongoose";
import Product from "./product.model";

export interface ICategory extends Document {
  name: string;
  description: string | null;
  products: string[];
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    __v: { type: Number, select: false },
  },
  { timestamps: true, strictQuery: false }
);

export default model<ICategory>("Category", categorySchema);
