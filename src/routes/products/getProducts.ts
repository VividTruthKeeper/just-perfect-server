import express, { Request, Response } from "express";
import { getAllProducts, getProductById } from "../../services/product.service";
import Product from "../../models/product.model";
import { GenericError } from "../../errors/generic-error";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
  const { page = 1, perPage = 10 } = req.query;

  if (page < 1 || perPage < 1)
    throw new GenericError("page and perPage must be at least 1", 400);

  const count = await Product.countDocuments();
  const totalPages = Math.ceil(count / ((perPage as any) * 1));
  const pagination = {
    count,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  res.status(200).send({
    status: "success",
    data: await getAllProducts(page, perPage),
    pagination,
  });
});

router.get("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  res.status(200).send({
    status: "success",
    data: (await getProductById(id)) || {},
  });
});

export { router as getProductsRouter };
