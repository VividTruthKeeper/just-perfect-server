import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

// Errors
import { RequestValidationError } from "../../errors/request-validation-error";
import { GenericError } from "../../errors/generic-error";

// Services
import { findUser, createUser } from "../../services/user.service";
import createToken from "../../functions/createToken";
import sanitizeUser from "../../functions/sanitizeUser";

const router = express.Router();

router.post(
  "/api/users/signUp",
  [
    body("firstName")
      .isLength({ min: 3, max: 20 })
      .withMessage("First name must be between 3 and 20 characters"),
    body("lastName")
      .isLength({ min: 3, max: 20 })
      .withMessage("Last name must be between 3 and 20 characters"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .trim()
      .isLength({ min: 8, max: 64 })
      .matches(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)
      .withMessage(
        "Password must be between 8 and 64 characters, must contain 1 number, 1 uppercase and 1 lowercase letters, and 1 special character"
      ),
    body("address")
      .isObject()
      .withMessage("A valid address info must be provided"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const {
      firstName,
      lastName,
      email,
      password,
      address,
      paymentInfo,
      adminPassword,
    } = req.body;
    const sanitizedEmail: string = email.toLowerCase();

    if (
      !(
        address.street &&
        address.city &&
        address.state &&
        address.zipCode &&
        address.country
      )
    )
      throw new GenericError("A valid address must be provided", 400);

    const userWithEmail = await findUser({ email: sanitizedEmail });

    if (userWithEmail !== null) {
      throw new GenericError("User already exists", 409);
    }

    const isAdmin = adminPassword === process.env.ADMIN_PASSWORD;
    if (adminPassword) {
      if (!isAdmin)
        res.status(403).send({
          status: "failed",
          message: "Access denied",
        });
    }

    const token = isAdmin
      ? await createToken(sanitizedEmail, "admin")
      : createToken(sanitizedEmail);
    const newUser = await createUser({
      email: sanitizedEmail,
      firstName,
      lastName,
      password,
      token,
      address,
      paymentInfo,
    });

    const userJSON = sanitizeUser(newUser);

    res.status(201).send({
      status: "success",
      user: userJSON,
    });
  }
);

export { router as signupRouter };
