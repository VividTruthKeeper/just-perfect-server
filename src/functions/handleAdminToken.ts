import jwt, { TokenExpiredError } from "jsonwebtoken";
import { TokenError } from "../errors/token-error";

export const handleAdminToken = async (token: any): Promise<any> => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.TOKEN_KEY || "");
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new TokenError();
    }
  }
  if (!(decodedToken instanceof Object)) {
    throw new TokenError();
  }
  const { status } = decodedToken;
  if (status === "admin") return true;
  else return false;
};
