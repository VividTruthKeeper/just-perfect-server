import express, { Request, Response } from "express";

// Functions
import sanitizeUser from "../../functions/sanitizeUser";

// Services
import { findUser } from "../../services/user.service";

// Errors
import { GenericError } from "../../errors/generic-error";
import { TokenError } from "../../errors/token-error";
import { handleToken } from "../../functions/handleToken";

const router = express.Router();

router.get("/api/users/currentUser", async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token) {
    throw new TokenError();
  }
  let updatedUser;
  const decodedToken = await handleToken(token);
  const userByEmail = await findUser({ email: decodedToken.email });
  if (userByEmail) {
    const sanitizedUser = sanitizeUser(userByEmail, true);
    updatedUser = { ...sanitizedUser };
    res.status(200).send({
      status: "success",
      user: updatedUser,
    });
  } else {
    throw new GenericError("User not found", 404);
  }
});

export { router as currentUserRouter };
