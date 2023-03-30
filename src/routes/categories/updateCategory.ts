import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import { updateCategory } from "../../services/category.service";
import { RequestValidationError } from "../../errors/request-validation-error";
import { adminAuth } from "../../middlewares/adminAuth";

const router = express.Router();

router.put(
  "/api/categories/update/:id",
  adminAuth,
  [
    body("name")
      .isLength({ min: 3, max: 15 })
      .withMessage("First name must be between 3 and 20 characters"),
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

    const { name, description } = req.body;
    try {
      res.status(200).send({
        status: "success",
        data: await updateCategory(id as string, name, description),
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export { router as updateCategoryRouter };
