import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { GenericError } from "../../errors/generic-error";
import { RequestValidationError } from "../../errors/request-validation-error";
import {
  addCategory,
  getCategoryByName,
} from "../../services/category.service";

const router = express.Router();

router.post(
  "/api/categories/add",
  [body("name").exists().withMessage("Category name must be provided")],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { name, description } = req.body;

    if (await getCategoryByName(name)) {
      throw new GenericError("Category with the same name already exists", 409);
    }
    const newCategory = await addCategory(name, description || null);

    res.status(201).send({
      status: "success",
      data: newCategory,
    });
  }
);

export { router as addCategoryRouter };
