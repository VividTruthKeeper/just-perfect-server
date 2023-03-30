import express, { Request, Response } from "express";
import { param } from "express-validator";
import { adminAuth } from "../../middlewares/adminAuth";
import { getCommentById, getComments } from "../../services/comment.service";

const router = express.Router();

router.get("/api/comments", adminAuth, async (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    data: await getComments(),
  });
});

router.get(
  "/api/comments/:id",
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Received invalid comment ID"),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).send({
      status: "success",
      data: (await getCommentById(id)) || {},
    });
  }
);

export { router as getCommentsRouter };
