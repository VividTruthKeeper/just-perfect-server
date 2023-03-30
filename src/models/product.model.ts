import { Document, model, Schema } from "mongoose";
import { IComment } from "./comment.model";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  comments: IComment[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String, required: true }],
    comments: [
      {
        user: {
          id: { type: Schema.Types.ObjectId, ref: "User", required: true },
          firstName: { type: String, required: true },
          lastName: { type: String, required: true },
        },
        content: { type: String, required: true },
        rating: { type: Number, required: true },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    __v: { type: Number, select: false },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
