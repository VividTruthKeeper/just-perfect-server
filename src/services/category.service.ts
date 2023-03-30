// Models
import { GenericError } from "../errors/generic-error";
import Category from "../models/category.model";
import { ICategory } from "../models/category.model";

export const getAllCategories = async (): Promise<ICategory[] | []> => {
  return await Category.find();
};

export const getCategoryByName = async (
  name: string
): Promise<ICategory | null> => {
  return await Category.findOne({ name }, null, { lean: true });
};

export const getCategoryById = async (
  id: string
): Promise<ICategory | null> => {
  return await Category.findOne({ id }, null, { lean: true });
};

export const addCategory = async (name: string, description: string | null) => {
  return await Category.create({ name, description });
};

export const updateCategory = async (
  id: string,
  name: string,
  description: string | null
) => {
  return await Category.findOneAndUpdate(
    { id },
    { name, description },
    { new: true }
  );
};

export const modifyProductInCategory = async (
  id: string,
  productId: string,
  action: "ADD" | "DELETE"
) => {
  const category = await Category.findOne({ _id: id });
  if (!category) return false;
  switch (action) {
    case "ADD":
      return await Category.findOneAndUpdate(
        { _id: id },
        { $push: { products: productId } },
        { new: true }
      );
    case "DELETE":
      return await Category.findOneAndUpdate(
        { _id: id },
        { $pull: { products: productId } },
        { new: true }
      );
    default:
      return null;
  }
};

export const deleteCategory = async (id: string) => {
  return await Category.findOneAndRemove({ _id: id });
};
