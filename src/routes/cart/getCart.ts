import express, { Request, Response } from "express";
import { param } from "express-validator";

const router = express.Router();

router.get("/api/cart", async (req: Request, res: Response) => {});
export { router as getCartRouter };
