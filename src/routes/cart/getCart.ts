import express, { Request, Response } from "express";
import { body, param, query, validationResult } from "express-validator";
import { GenericError } from "../../errors/generic-error";
import { handleToken } from "../../functions/handleToken";
import { Cart } from "../../models/cart.model";
import { RequestValidationError } from "../../errors/request-validation-error";

const router = express.Router();

router.get(
  "/api/cart",
  [
    query("token").exists().withMessage("A valid token must be provided"),
    body("userId")
      .isLength({ min: 24, max: 24 })
      .withMessage("A valid userId must be provided"),
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

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    res.status(200).send({
      status: "success",
      data: cart ? cart.items : [],
    });
  }
);
export { router as getCartRouter };
