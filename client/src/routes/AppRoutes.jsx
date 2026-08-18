import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Dashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/Products/ProductList";
import CreateProduct from "../pages/admin/Products/CreateProduct"
import EditProduct from "../pages/admin/Products/EditProduct";
import StockHistory from "../pages/admin/Products/StockHistory";

import CategoryList from "../pages/admin/category/CategoryList"
import CreateCategory from "../pages/admin/category/CreateCategory";
import EditCategory from "../pages/admin/category/EditCategory";


import SupplierDashboard from "../pages/supplier/SupplierDashboard";
import AdminLayout from "../layouts/AdminLayout";
import SupplierList from "../pages/admin/supplier/SupplierList";
import CustomerList from "../pages/admin/customer/CustomerList";
import AuthLayout from "../layouts/AuthLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import SupplierLayout from "../layouts/SupplierLayout";

import CreateSupplierProduct from "../pages/supplier/Product/CreateSupplierProduct"
import SupplierProductList from "../pages/supplier/Product/SupplierProductList";
import CustomerProductList from "../pages/customer/Product/CustomerProductList";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerCart from "../pages/customer/order/CustomerCart";
import CustomerOrders from "../pages/customer/order/CustomerOrders";
import CustomerOrderDetails from "../pages/customer/order/CustomerOrderDetails";
import SupplierOrderList from "../pages/supplier/orders/SupplierOrderList";
import SupplierOrderDetails from "../pages/supplier/orders/SupplierOrderDetails";
import AdminOrderList from "../pages/admin/orders/AdminOrderList";
import AdminOrderDetails from "../pages/admin/orders/AdminOrderDetails";
import AdminOrderEdit from "../pages/admin/orders/AdminOrderEdit";
import AdminProductDetails from "../pages/admin/Products/ProductDetails";
import SupplierProductDetails from "../pages/supplier/Product/SupplierProductDeatil";
import CustomerProductDetails from "../pages/customer/Product/CustomerProductDetails";
import AdminProfile from "../pages/admin/AdminProfile";
import CustomerProfile from "../pages/customer/CustomerProfile";
import SupplierProfile from "../pages/supplier/SupplierProfile";
import LandingPage from "../pages/LandingPage";

function AppRoutes() {
    return (
        <Routes>

            {/* Public Routes */}
            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
            />

            {/* Admin Routes */}
            <Route
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]} />
                }
            >
                <Route element={<AdminLayout />}>
                    <Route
                        path="/admin/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/admin/products"
                        element={<ProductList />}
                    />

                    <Route
                        path="/admin/products/create"
                        element={<CreateProduct />}
                    />

                    <Route
                        path="/admin/products/:id"
                        element={
                            <AdminProductDetails />
                        }
                    />

                    <Route
                        path="/admin/products/:id/edit"
                        element={<EditProduct />}
                    />

                    <Route
                        path="/admin/categories"
                        element={<CategoryList />}
                    />

                    <Route
                        path="/admin/categories/create"
                        element={<CreateCategory />}
                    />

                    <Route
                        path="/admin/categories/:id/edit"
                        element={<EditCategory />}
                    />

                    <Route
                        path="/admin/suppliers"
                        element={<SupplierList />}
                    />

                    <Route
                        path="/admin/customer"
                        element={<CustomerList />}
                    />


                    <Route
                        path="/admin/profile"
                        element={<AdminProfile />}
                    />


                    <Route
                        path="/admin/products/:id/stock-history"
                        element={
                            <StockHistory />
                        }
                    />

                    <Route
                        path="/admin/orders"
                        element={<AdminOrderList />}
                    />

                    <Route
                        path="/admin/orders/:id"
                        element={<AdminOrderDetails />}
                    />

                    <Route
                        path="/admin/orders/:id/edit"
                        element={<AdminOrderEdit />}
                    />

                </Route>
            </Route>

            {/* Customer Routes */}
            <Route
                element={
                    <ProtectedRoute allowedRoles={["CUSTOMER"]} />
                }
            >
                <Route element={<CustomerLayout />}>
                    <Route
                        path="/customer/dashboard"
                        element={<CustomerDashboard />}
                    />
                    <Route
                        path="/customer/products"
                        element={<CustomerProductList />}
                    />
                    <Route
                        path="/customer/products/:id"
                        element={<CustomerProductDetails />}
                    />
                    <Route
                        path="/customer/cart"
                        element={<CustomerCart />}
                    />
                    <Route
                        path="/customer/order"
                        element={<CustomerOrders />}
                    />
                    <Route
                        path="/customer/orders/:id"
                        element={<CustomerOrderDetails />}
                    />
                    <Route
                        path="/customer/profile"
                        element={<CustomerProfile />}
                    />
                </Route>

            </Route>

            {/* Supplier Routes */}
            <Route
                element={
                    <ProtectedRoute allowedRoles={["SUPPLIER"]} />
                }
            >
                <Route element={<SupplierLayout />}>
                    <Route
                        path="/supplier/dashboard"
                        element={<SupplierDashboard />}
                    />
                    <Route
                        path="/supplier/products/create"
                        element={<CreateSupplierProduct />}
                    />

                    <Route
                        path="/supplier/products"
                        element={<SupplierProductList />}
                    />

                    <Route
                        path="/supplier/products/:id"
                        element={<SupplierProductDetails />}
                    />

                    <Route
                        path="/supplier/order"
                        element={<SupplierOrderList />}
                    />

                    <Route
                        path="/supplier/order/:id"
                        element={<SupplierOrderDetails />}
                    />

                    <Route
                        path="/supplier/profile"
                        element={<SupplierProfile />}
                    />
                </Route>


            </Route>

        </Routes>
    );
}

export default AppRoutes;