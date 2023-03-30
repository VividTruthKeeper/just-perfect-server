import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import "express-async-errors";
// DB
import { setupDB } from "./src/utils/db";

// Errors
import { DatabaseConnectionError } from "./src/errors/database-connection-error";
import { NotFoundError } from "./src/errors/not-found-error";

// Middleware
import { errorHandler } from "./src/middlewares/error-handler";

// Routes
// Users
import { signupRouter } from "./src/routes/users/signup";
import { signinRouter } from "./src/routes/users/singin";
import { currentUserRouter } from "./src/routes/users/currentUser";
import { allUsersRouter } from "./src/routes/users/allUsers";
import { updateUserAddressRouter } from "./src/routes/users/updateUserAddress";
import { updateUserPaymentInfoRouter } from "./src/routes/users/updateUserPaymentInfo";

// Categories
import { getCategoriesRouter } from "./src/routes/categories/getCategories";
import { addCategoryRouter } from "./src/routes/categories/addCategory";
import { updateCategoryRouter } from "./src/routes/categories/updateCategory";
import { deleteCategoryRouter } from "./src/routes/categories/deleteCategory";

// Products
import { getProductsRouter } from "./src/routes/products/getProducts";
import { addProductRouter } from "./src/routes/products/addProduct";
import { deleteProductRouter } from "./src/routes/products/deleteProduct";
import { updateProductRouter } from "./src/routes/products/updateProduct";

// Comments
import { addCommentRouter } from "./src/routes/comments/addComment";
import { getCommentsRouter } from "./src/routes/comments/getComments";

// Cart
import { getCartRouter } from "./src/routes/cart/getCart";

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

  // Cart
  app.use(getCartRouter);

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
