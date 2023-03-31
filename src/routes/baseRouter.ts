import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send({
    status: "success",
    data: "ЧЕ ЗА ТЯГИ БАРХАТНЫЕ КЕФТЕМЕ",
  });
});

export { router as baseRouter };
