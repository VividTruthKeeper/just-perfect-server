import express, { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import { GenericError } from "../../errors/generic-error";
import { handleToken } from "../../functions/handleToken";
import { Cart, CartDocument, CartItem } from "../../models/cart.model";
import { RequestValidationError } from "../../errors/request-validation-error";
import mongoose from "mongoose";
import Product from "../../models/product.model";

const router = express.Router();

router.post(
  "/api/cart/items",
  [
    query("token").exists().withMessage("A valid token must be provided"),
    body("productId")
      .notEmpty()
      .custom((value: string) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("A valid product ID must be provided"),
    body("quantity")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("userId")
      .notEmpty()
      .custom((value: string) => mongoose.Types.ObjectId.isValid(value))
      .withMessage("A valid user ID must be provided"),
  ],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    // Handle token
    const { token } = req.query;
    const decodedToken = await handleToken(token);

    if (!decodedToken) throw new GenericError("Unhadled token error", 500);

    const { productId, quantity, userId } = req.body;

    // Find the user's cart
    let cart: CartDocument | null = await Cart.findOne({ user: userId });

    // If the user's cart doesn't exist, create a new one
    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    // Check if product exists
    const product = await Product.findOne({ _id: productId });
    if (!product) throw new GenericError("Could not find product", 400);

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item: CartItem) =>
      item.product.equals(productId)
    );

    if (existingItem) {
      // If the product is already in the cart, update the quantity and price
      existingItem.quantity += quantity;
      existingItem.price = existingItem.quantity * product.price;
    } else {
      // If the product is not already in the cart, add it as a new item
      const newItem: any = {
        product: productId,
        quantity: quantity,
        price: product.price * quantity,
      };
      cart.items.push(newItem);
    }

    // Save the updated cart
    await cart.save();

    res.status(201).send({
      status: "success",
      data: cart,
    });
  }
);
export { router as addItemtoCartRouter };
