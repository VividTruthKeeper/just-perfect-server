import express, { Request, Response } from "express";
import { body, validationResult, param } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { GenericError } from "../../errors/generic-error";
import { updateProduct } from "../../services/product.service";
import {
  getCategoryById,
  modifyProductInCategory,
  updateCategory,
} from "../../services/category.service";

const router = express.Router();

router.put(
  "/api/products/update/:id",
  [
    body("name").exists().withMessage("Product name must be provided"),
    body("description")
      .exists()
      .withMessage("Product description must be provided"),
    body("price").exists().withMessage("Product price must be provided"),
    param("id")
      .isLength({ min: 24, max: 24 })
      .withMessage("Received invalid product ID"),
  ],
  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { name, description, price } = req.body;
    const { id } = req.params;

    // update product
    const updatedProduct = await updateProduct(id, {
      name,
      description,
      price,
    });

    // if failed, throw a 500 error
    if (!updatedProduct)
      throw new GenericError("Could not update product", 500);

    // send response if ok
    res.status(200).send({
      status: "success",
      data: updatedProduct,
    });
  }
);

export { router as updateProductRouter };
