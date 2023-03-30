import express, { Request, Response } from "express";
import { query } from "express-validator";

// Services
import { getAllUsers } from "../../services/user.service";

// Errors
import { GenericError } from "../../errors/generic-error";
import { adminAuth } from "../../middlewares/adminAuth";

const router = express.Router();

router.get(
  "/api/private/users",
  adminAuth,
  async (req: Request, res: Response) => {
    const users = await getAllUsers();

    res.status(200).send({
      status: "success",
      data: users,
    });
  }
);

export { router as allUsersRouter };
