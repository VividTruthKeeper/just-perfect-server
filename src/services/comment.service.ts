import { Comment, IComment } from "../models/comment.model";

export const addComment = async (payload: {
  user: IComment["user"];
  productId: string;
  content: string;
  rating: number;
}) => {
  return await Comment.create({
    user: {
      id: payload.user.id,
      firstName: payload.user.firstName,
      lastName: payload.user.lastName,
    },
    product: payload.productId,
    content: payload.content,
    rating: payload.rating,
  });
};

export const getComments = async () => {
  return await Comment.find();
};

export const getCommentById = async (id: string) => {
  return await Comment.findOne({ _id: id });
};
