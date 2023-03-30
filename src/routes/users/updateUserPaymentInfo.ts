import express, { Request, Response } from "express";
import { body, param } from "express-validator";
import { findUser, updateUserPaymentInfo } from "../../services/user.service";
import { GenericError } from "../../errors/generic-error";

const router = express.Router();

router.put(
  "/api/users/:id/paymentInfo",
  [
    body("paymentInfo")
      .isObject()
      .withMessage("A valid payment info must be provided"),
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Received an invalid user ID"),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const paymentInfo = req.body;

    if (
      !(
        paymentInfo.cardHolderName &&
        paymentInfo.cardNumber &&
        paymentInfo.expirationDate &&
        paymentInfo.cvv
      )
    )
      throw new GenericError("A valid address info must be provided", 400);

    const user = await findUser({ _id: id });
    if (!user) throw new GenericError("Could not find user", 404);

    const updatedUser = await updateUserPaymentInfo(id, paymentInfo);

    res.status(200).send({
      status: "success",
      data: updatedUser,
    });
  }
);

export { router as updateUserPaymentInfoRouter };
