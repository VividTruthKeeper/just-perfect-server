import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { deleteProduct } from "../../services/product.service";
import { GenericError } from "../../errors/generic-error";
import { modifyProductInCategory } from "../../services/category.service";
import fs from "fs";
import path from "path";
import { adminAuth } from "../../middlewares/adminAuth";

const router = express.Router();

router.delete(
  "/api/products/delete",
  adminAuth,
  [body("id").exists().withMessage("Product id must be provided")],

  async (req: Request, res: Response) => {
    // req params error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { id } = req.body;

    const deletedProduct = await deleteProduct(id);
    if (!deletedProduct) throw new GenericError("Product not found", 404);

    const updatedCategory = modifyProductInCategory(
      deletedProduct.category,
      deletedProduct.id,
      "DELETE"
    );

    if (deletedProduct.images.length > 0) {
      // Delete uploaded images if product creation fails
      try {
        deletedProduct.images.forEach((image: string) => {
          fs.unlink(
            path.join(__dirname, `../../../public/images/products/${image}`),
            (err) => {
              if (err) console.log(err);
            }
          );
        });
      } catch (err) {
        console.log(err);
      }
    }

    res.status(200).send({
      status: "success",
      data: deletedProduct,
    });
  }
);

export { router as deleteProductRouter };
