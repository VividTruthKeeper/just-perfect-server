import express, { Request, Response } from "express";
import { param } from "express-validator";
import {
  getAllCategories,
  getCategoryById,
} from "../../services/category.service";

const router = express.Router();

router.get("/api/categories", async (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    data: await getAllCategories(),
  });
});

router.get(
  "/api/categories/:id",
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Received invalid category ID"),
  ],
  async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).send({
      status: "success",
      data: (await getCategoryById(id)) || {},
    });
  }
);

export { router as getCategoriesRouter };
