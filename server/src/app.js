import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import stockHistoryRoute from "./routes/stockHistory.route.js";
import categoriesRoutes from "./routes/category.routes.js"
import supplierProduct from "./routes/supplierProduct.routes.js"
import customerProduct from "./routes/customerProduct.routes.js"
import customerorder from "./routes/customerOrder.routes.js"


const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.ORIGIN_URL,
  credentials: true
}))

app.use(
  "/api/auth",
  authRoutes
)

app.use(
  "/api/admin",
  adminRoutes,
  productRoutes,
  stockHistoryRoute,
  categoriesRoutes,
);

app.use(
  "/api/supplier",
  supplierProduct,
  categoriesRoutes
);

app.use(
  "/api/customer",
  customerProduct,
  customerorder,
);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "WMS Success",
  });
});

export default app;