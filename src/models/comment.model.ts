import mongoose, { Schema, Document } from "mongoose";
import { IUserInput } from "./user.model";
import { IProduct } from "./product.model";

export interface IComment extends Document {
  user: {
    id: IUserInput["_id"];
    firstName: IUserInput["firstName"];
    lastName: IUserInput["lastName"];
  };
  product: IProduct["_id"];
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema(
  {
    user: {
      id: { type: Schema.Types.ObjectId, ref: "User", required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true, strictQuery: false }
);

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
