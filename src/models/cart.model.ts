import mongoose, { Document, Model, Schema } from "mongoose";
import { IUserInput } from "./user.model";

export interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

export interface CartDocument extends Document {
  user: IUserInput["_id"];
  items: CartItem[];
}

export interface CartModel extends Model<CartDocument> {}

const cartItemSchema = new Schema<CartItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
    timestamps: false,
    strictQuery: false,
  }
);

const cartSchema = new Schema<CartDocument, CartModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [cartItemSchema],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
    strictQuery: false,
  }
);

export const Cart = mongoose.model<CartDocument, CartModel>("Cart", cartSchema);
