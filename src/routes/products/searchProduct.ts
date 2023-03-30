import express, { Request, Response } from "express";
import { getAllProducts, getProductById } from "../../services/product.service";
import Product from "../../models/product.model";
import { GenericError } from "../../errors/generic-error";

const router = express.Router();

router.get("/api/products/search", async (req: Request, res: Response) => {
  const { page = 1, perPage = 10, search = null } = req.query;

  console.log(search);

  if (search === null)
    throw new GenericError("Search query must be provided", 400);

  if (page < 1 || perPage < 1)
    throw new GenericError("page and perPage must be at least 1", 400);
  // @ts-ignore
  const products = await Product.find({ $text: { $search: search } })
    .skip(((page as any) - 1) * (perPage as any))
    .limit(perPage as any);

  //   const count = await Product.countDocuments();
  //   const totalPages = Math.ceil(count / ((perPage as any) * 1));
  //   const pagination = {
  //     count,
  //     totalPages,
  //     hasNextPage: page < totalPages,
  //     hasPrevPage: page > 1,
  //   };

  res.status(200).send({
    status: "success",
    data: products,
    // pagination,
  });
});

export { router as productSearchRouter };
