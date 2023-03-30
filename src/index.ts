import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import "express-async-errors";
// DB
import { setupDB } from "./utils/db";

// Errors
import { DatabaseConnectionError } from "./errors/database-connection-error";
import { NotFoundError } from "./errors/not-found-error";

// Middleware
import { errorHandler } from "./middlewares/error-handler";

// Routes
// Users
import { signupRouter } from "./routes/users/signup";
import { signinRouter } from "./routes/users/singin";
import { currentUserRouter } from "./routes/users/currentUser";
import { allUsersRouter } from "./routes/users/allUsers";
import { updateUserAddressRouter } from "./routes/users/updateUserAddress";
import { updateUserPaymentInfoRouter } from "./routes/users/updateUserPaymentInfo";

// Categories
import { getCategoriesRouter } from "./routes/categories/getCategories";
import { addCategoryRouter } from "./routes/categories/addCategory";
import { updateCategoryRouter } from "./routes/categories/updateCategory";
import { deleteCategoryRouter } from "./routes/categories/deleteCategory";

// Products
import { getProductsRouter } from "./routes/products/getProducts";
import { addProductRouter } from "./routes/products/addProduct";
import { deleteProductRouter } from "./routes/products/deleteProduct";
import { updateProductRouter } from "./routes/products/updateProduct";

// Comments
import { addCommentRouter } from "./routes/comments/addComment";
import { getCommentsRouter } from "./routes/comments/getComments";

const app = express();
app.use(express.json());
app.use(cors());

const start = async (): Promise<void> => {
  // Static
  app.use(express.static("public"));

  // User routes
  app.use(allUsersRouter);
  app.use(signupRouter);
  app.use(signinRouter);
  app.use(currentUserRouter);
  app.use(updateUserAddressRouter);
  app.use(updateUserPaymentInfoRouter);

  // Category routes
  app.use(getCategoriesRouter);
  app.use(addCategoryRouter);
  app.use(updateCategoryRouter);
  app.use(deleteCategoryRouter);

  // Product routes
  app.use(getProductsRouter);
  app.use(addProductRouter);
  app.use(deleteProductRouter);
  app.use(updateProductRouter);

  // Comment routes
  app.use(addCommentRouter);
  app.use(getCommentsRouter);

  // connect to db
  try {
    await setupDB();
  } catch (err) {
    throw new DatabaseConnectionError();
  }

  app.all("*", async () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);
  const port: string = process.env.API_PORT || "5000";
  app.listen(port, () => console.log(`Listening on ${port}`));
};

// start server

void start();

export default app;
