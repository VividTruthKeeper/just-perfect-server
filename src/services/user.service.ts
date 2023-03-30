import User, { IUserDocument, IUserInput } from "../models/user.model";
import { FilterQuery, QueryOptions } from "mongoose";
import { GenericError } from "../errors/generic-error";

export const createUser = async (input: any) => {
  return await User.create(input);
};

export const findUser = async (
  query: FilterQuery<IUserDocument>,
  options: QueryOptions = { lean: true }
) => {
  return await User.findOne(query, null, options);
};

export const assignToken = async (email: string, token: string) => {
  const user = await User.findOneAndUpdate({ email }, { token }, { new: true });
  if (!user) throw new GenericError("User not found", 404);

  return user;
};

interface ILoginUserReturn {
  passwordCorrect: boolean;
  user: IUserDocument;
}

export const loginUser = async ({
  email,
  password,
}: {
  email: IUserDocument["email"];
  password: IUserDocument["password"];
}): Promise<ILoginUserReturn> => {
  const user = await findUser({ email }, { lean: false });

  if (!user) {
    throw new GenericError("User not found", 404);
  }

  const passwordCorrect: boolean = await user.comparePassword(password);

  return { passwordCorrect, user };
};

export const getAllUsers = async (page: any, perPage: any) => {
  return User.find()
    .skip((page - 1) * perPage)
    .limit(perPage * 1)
    .exec();
};
export const deleteAllUsers = async () => {
  return User.deleteMany({});
};

export const updateUserAddress = async (
  id: string,
  payload: IUserInput["address"]
) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { address: payload },
    { new: true }
  );
};

export const updateUserPaymentInfo = async (
  id: string,
  payload: IUserInput["address"]
) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { paymentInfo: payload },
    { new: true }
  );
};
