import express, { Request, Response } from "express";
import { param, validationResult } from "express-validator";
import { deleteCategory } from "../../services/category.service";
import { RequestValidationError } from "../../errors/request-validation-error";
import { GenericError } from "../../errors/generic-error";
import { adminAuth } from "../../middlewares/adminAuth";

const router = express.Router();

router.delete(
  "/api/categories/delete/:id",
  adminAuth,
  [
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Received invalid category ID"),
  ],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { id } = req.params;

    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) throw new GenericError("Category not found", 404);

    res.status(200).send({
      status: "success",
      data: deletedCategory,
    });
  }
);

export { router as deleteCategoryRouter };
