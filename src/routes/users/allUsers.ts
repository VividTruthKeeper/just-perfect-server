import express, { Request, Response } from "express";
import { query } from "express-validator";

// Services
import { getAllUsers } from "../../services/user.service";

// Errors
import { GenericError } from "../../errors/generic-error";
import { adminAuth } from "../../middlewares/adminAuth";
import User from "../../models/user.model";

const router = express.Router();

router.get(
  "/api/private/users",
  adminAuth,
  async (req: Request, res: Response) => {
    const { page = 1, perPage = 10 } = req.query;

    if (page < 1 || perPage < 1)
      throw new GenericError("page and perPage must be at least 1", 400);

    const users = await getAllUsers(page, perPage);

    const count = await User.countDocuments();
    const totalPages = Math.ceil(count / ((perPage as any) * 1));
    const pagination = {
      count,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    res.status(200).send({
      status: "success",
      data: users,
      pagination,
    });
  }
);

export { router as allUsersRouter };
