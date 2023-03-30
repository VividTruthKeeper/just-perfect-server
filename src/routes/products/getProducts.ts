import express, { Request, Response } from "express";
import { getAllProducts, getProductById } from "../../services/product.service";

const router = express.Router();

router.get("/api/products", async (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    data: await getAllProducts(),
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
