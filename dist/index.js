"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
// DB
const db_1 = require("./src/utils/db");
// Errors
const database_connection_error_1 = require("./src/errors/database-connection-error");
const not_found_error_1 = require("./src/errors/not-found-error");
// Middleware
const error_handler_1 = require("./src/middlewares/error-handler");
// Routes
// Users
const signup_1 = require("./src/routes/users/signup");
const singin_1 = require("./src/routes/users/singin");
const currentUser_1 = require("./src/routes/users/currentUser");
const allUsers_1 = require("./src/routes/users/allUsers");
const updateUserAddress_1 = require("./src/routes/users/updateUserAddress");
const updateUserPaymentInfo_1 = require("./src/routes/users/updateUserPaymentInfo");
// Categories
const getCategories_1 = require("./src/routes/categories/getCategories");
const addCategory_1 = require("./src/routes/categories/addCategory");
const updateCategory_1 = require("./src/routes/categories/updateCategory");
const deleteCategory_1 = require("./src/routes/categories/deleteCategory");
// Products
const getProducts_1 = require("./src/routes/products/getProducts");
const addProduct_1 = require("./src/routes/products/addProduct");
const deleteProduct_1 = require("./src/routes/products/deleteProduct");
const updateProduct_1 = require("./src/routes/products/updateProduct");
const searchProduct_1 = require("./src/routes/products/searchProduct");
// Comments
const addComment_1 = require("./src/routes/comments/addComment");
const getComments_1 = require("./src/routes/comments/getComments");
// Cart
const getCart_1 = require("./src/routes/cart/getCart");
const addItemtoCart_1 = require("./src/routes/cart/addItemtoCart");
const clearCart_1 = require("./src/routes/cart/clearCart");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    // Static
    app.use(express_1.default.static("public"));
    // User routes
    app.use(allUsers_1.allUsersRouter);
    app.use(signup_1.signupRouter);
    app.use(singin_1.signinRouter);
    app.use(currentUser_1.currentUserRouter);
    app.use(updateUserAddress_1.updateUserAddressRouter);
    app.use(updateUserPaymentInfo_1.updateUserPaymentInfoRouter);
    // Category routes
    app.use(getCategories_1.getCategoriesRouter);
    app.use(addCategory_1.addCategoryRouter);
    app.use(updateCategory_1.updateCategoryRouter);
    app.use(deleteCategory_1.deleteCategoryRouter);
    // Product routes
    app.use(getProducts_1.getProductsRouter);
    app.use(addProduct_1.addProductRouter);
    app.use(deleteProduct_1.deleteProductRouter);
    app.use(updateProduct_1.updateProductRouter);
    app.use(searchProduct_1.productSearchRouter);
    // Comment routes
    app.use(addComment_1.addCommentRouter);
    app.use(getComments_1.getCommentsRouter);
    // Cart
    app.use(getCart_1.getCartRouter);
    app.use(addItemtoCart_1.addItemtoCartRouter);
    app.use(clearCart_1.clearCartRouter);
    // connect to db
    try {
        yield (0, db_1.setupDB)();
    }
    catch (err) {
        throw new database_connection_error_1.DatabaseConnectionError();
    }
    app.all("*", () => __awaiter(void 0, void 0, void 0, function* () {
        throw new not_found_error_1.NotFoundError();
    }));
    app.use(error_handler_1.errorHandler);
    const port = process.env.API_PORT || "5000";
    app.listen(port, () => console.log(`Listening on ${port}`));
});
// start server
void start();
exports.default = app;
//# sourceMappingURL=index.js.map