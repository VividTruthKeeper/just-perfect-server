import express, { Request, Response } from "express";
import { Comment, IComment } from "../../models/comment.model";
import { IUserInput } from "../../models/user.model";
import { IProduct } from "../../models/product.model";
import { RequestValidationError } from "../../errors/request-validation-error";
import { body, param, validationResult } from "express-validator";
import { addComment } from "../../services/comment.service";
import { GenericError } from "../../errors/generic-error";
import { getProductById } from "../../services/product.service";
import { findUser } from "../../services/user.service";
import { modifyCommentInProduct } from "../../services/product.service";

const router = express.Router();

router.post(
  "/api/products/:productId/comments",
  [
    body("userId")
      .isLength({ min: 24, max: 24 })
      .withMessage("A valid user ID must be provided"),
    body("content").exists().withMessage("Comment content must be provided"),
    body("rating")
      .exists()
      .isInt()
      .withMessage("Comment rating must be provided, and must be numeric"),
    param("productId")
      .isLength({ min: 24, max: 24 })
      .withMessage("A valid product ID must be provided"),
  ],
  async (req: Request, res: Response) => {
    // errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());

    try {
      const { productId } = req.params;
      const { userId, content, rating } = req.body;

      // check if product exists
      const product = await getProductById(productId);
      if (!product) throw new GenericError("Product was not found", 404);

      // check if user exists
      const user = await findUser({ _id: userId });

      if (!user) throw new GenericError("User was not found", 404);

      // Create new comment
      const newComment = await addComment({
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          id: user._id,
        },
        productId,
        content,
        rating,
      });
      if (!newComment) throw new GenericError("Could not add comment", 500);

      // update product
      const updatedProduct = await modifyCommentInProduct(
        productId,
        {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id,
          },
          content,
          rating,
        },
        "ADD"
      );

      // check if product was updated
      if (!updatedProduct) {
        // if not, delete a new comment
        newComment.delete();
        throw new GenericError("Failed to update product", 500);
      }

      res.status(201).send({
        status: "success",
        data: newComment,
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export { router as addCommentRouter };
