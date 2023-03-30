import express, { Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";
import { GenericError } from "../../errors/generic-error";
import { handleToken } from "../../functions/handleToken";
import { Cart, CartDocument, CartItem } from "../../models/cart.model";
import { RequestValidationError } from "../../errors/request-validation-error";
import mongoose from "mongoose";

const router = express.Router();

router.delete(
  "/api/cart/items",
  [
    query("token").exists().withMessage("A valid token must be provided"),
    body("userId")
      .notEmpty()
      .custom((value: string) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("A valid user ID must be provided"),
  ],
  async (req: Request, res: Response) => {
    const { token } = req.query;
    const { userId } = req.body;

    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const decodedToken = await handleToken(token);

    if (!decodedToken) throw new GenericError("Unhadled token error", 500);

    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(202).send({
      status: "success",
      data: cart ? cart.items : [],
    });
  }
);

router.delete(
  "/api/cart/items/:itemId",
  [
    query("token").exists().withMessage("A valid token must be provided"),
    body("userId")
      .notEmpty()
      .custom((value: string) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("A valid user ID must be provided"),
    param("itemId")
      .notEmpty()
      .custom((value: string) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("A valid product ID must be provided"),
  ],
  async (req: Request, res: Response) => {
    const { token } = req.query;
    const { userId } = req.body;
    const { itemId } = req.params;
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    // Check token
    const decodedToken = await handleToken(token);
    if (!decodedToken) throw new GenericError("Unhadled token error", 500);

    // Find the user's cart
    const cart: CartDocument | null = await Cart.findOne({ user: userId });

    // If the user's cart doesn't exist, return an error
    if (!cart) throw new GenericError("Cart not found", 404);

    // Remove the item from the cart
    cart.items = cart.items.filter(
      (item: CartItem) => !item.product.equals(itemId)
    );

    // Save the updated cart
    await cart.save();

    res.status(202).send({
      status: "success",
      data: cart.items,
    });
  }
);

export { router as clearCartRouter };
