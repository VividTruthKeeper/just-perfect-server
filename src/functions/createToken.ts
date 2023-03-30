import jwt from "jsonwebtoken";

export default async (
  email: string,
  status: "client" | "admin" = "client"
): Promise<string> => {
  return jwt.sign({ email, status }, process.env.TOKEN_KEY || "", {
    expiresIn: process.env.TOKEN_EXPIRES_IN || "2h",
  });
};
