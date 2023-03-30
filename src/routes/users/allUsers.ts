import express, { Request, Response } from "express";

// Services
import { getAllUsers } from "../../services/user.service";

// Errors
import { GenericError } from "../../errors/generic-error";

const router = express.Router();

router.get("/api/private/users", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.log(error);
    throw new GenericError("Something went wrong", 500);
  }
});

export { router as allUsersRouter };
