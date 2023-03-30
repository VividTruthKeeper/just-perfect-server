import { NextFunction, Request, Response } from "express";
import { TokenError } from "../errors/token-error";
import { GenericError } from "../errors/generic-error";
import { handleAdminToken } from "../functions/handleAdminToken";

export const adminAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  if (!token) throw new TokenError();
  const status = await handleAdminToken(token);
  if (!status) throw new GenericError("Access denied", 403);
  next();
};
