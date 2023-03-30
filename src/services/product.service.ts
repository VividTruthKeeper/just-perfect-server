// Models
import Product from "../models/product.model";
import { IProduct } from "../models/product.model";
import fs from "fs";
import path from "path";
import { IComment } from "../models/comment.model";

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findOne({ id }, null, { lean: true });
};
export const getProductByName = async (
  name: string
): Promise<IProduct | null> => {
  return await Product.findOne({ name }, null, { lean: true });
};

export const addProduct = async (payload: {
  name: string;
  description: string;
  price: string;
  images: string[];
  category: string;
}) => {
  return await Product.create(payload);
};

export const deleteProduct = async (id: string) => {
  return await Product.findOneAndDelete({ _id: id });
};

export const deleteImages = (images: string[]) => {
  if (images.length > 0) {
    // Delete uploaded images if product creation fails
    images.forEach((image: string) => {
      fs.unlink(
        path.join(__dirname, `../../public/images/products/${image}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    });
  }
};

export const updateProduct = async (
  id: string,
  payload: {
    name: string;
    description: string;
    price: string;
  }
) => {
  return await Product.findOneAndUpdate({ _id: id }, payload);
};

export const modifyCommentInProduct = async (
  id: string,
  payload: {
    user: IComment["user"];
    content: IComment["content"];
    rating: IComment["rating"];
  },
  action: "ADD" | "DELETE"
) => {
  switch (action) {
    case "ADD":
      return await Product.findOneAndUpdate(
        { _id: id },
        { $push: { comments: payload } },
        { new: true }
      );
    case "DELETE":
      return await Product.findOneAndUpdate(
        { _id: id },
        { $pull: { products: payload } },
        { new: true }
      );
    default:
      return null;
  }
};
