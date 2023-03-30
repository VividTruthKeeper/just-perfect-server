import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { addProduct, deleteImages } from "../../services/product.service";
import { upload } from "../../middlewares/upload";
import { GenericError } from "../../errors/generic-error";
import { modifyProductInCategory } from "../../services/category.service";

const router = express.Router();

router.post(
  "/api/products/add",
  upload.array("images"),
  [
    body("name").exists().withMessage("Product name must be provided"),
    body("description")
      .exists()
      .withMessage("Product descriprion must be provided"),
    body("price").exists().withMessage("Product price must be provided"),
    body("category").exists().withMessage("Product category must be provided"),
  ],

  async (req: Request, res: Response) => {
    // @ts-ignore
    const images = req.files.map((file: any) => file.filename);

    // req params error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      deleteImages(images);
      throw new RequestValidationError(errors.array());
    }
    if (req.files?.length === 0)
      throw new GenericError("Product images must be provided", 400);

    const { name, description, price, category } = req.body;

    if (category.length !== 24) {
      throw new GenericError("A valid category ID must be provided", 400);
    }

    const newProduct = await addProduct({
      name,
      description,
      price,
      category,
      images,
    });

    if (!newProduct) {
      deleteImages(images);
      throw new GenericError("Product could not be created", 500);
    }

    const updatedCategory = modifyProductInCategory(
      category,
      newProduct.id,
      "ADD"
    );

    if ((await updatedCategory) === false) {
      newProduct.delete();
      deleteImages(images);
      throw new GenericError("Category not found", 400);
    }

    res.status(201).send({
      status: "success",
      data: newProduct,
    });
  }
);

export { router as addProductRouter };
