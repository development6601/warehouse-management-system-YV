import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice/adminSlice";
import adminProductReducer from "./slices/adminSlice/adminProductSlice";
import categoryReducer from "./slices/adminSlice/categorySlice";
import supplierReducer from "./slices/supplierSlice/supplierSlice";
import customerReducer from "./slices/customerSlice/customerSlice";
import supplierProductReducer from "./slices/supplierSlice/supplierProductSlice"
import supplierCategoryReducer from "./slices/supplierSlice/supplierCategorySlice"
import customerProductReducer from "./slices/customerSlice/customerProductSlice"
import orderReducer from "./slices/customerSlice/customerOrderSlice";
import supplierOrderReducer from "./slices/supplierSlice/supplierOrderSlice"
import adminOrderReducer from "./slices/adminSlice/adminOrderSlice"
import adminProfileReducer from "./slices/adminSlice/adminProfileSlice"
import supplierProfileReducer from "./slices/supplierSlice/supplierprofileSlice"
import customerProfileReducer from "./slices/customerSlice/customerProfileSlice"
import adminDashboardReducer from "./slices/adminSlice/adminDashboardSlice"
import supplierDashboardReducer from "./slices/supplierSlice/supplierDashboardSlice"
import customerDashboardReducer from "./slices/customerSlice/customerDashboardSlice"
import customerCategoryReducer from "./slices/customerSlice/customerCategorySlice"
import { persistReducer } from "redux-persist";
import storage from "./storage";

const persistConfig = {
  key: "WMS",
  storage,
  whitelist: ["auth"],
};


const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  product: adminProductReducer,
  category: categoryReducer,
  supplier: supplierReducer,
  customer: customerReducer,
  supplierProduct: supplierProductReducer,
  supplierCategory: supplierCategoryReducer,
  customerProduct: customerProductReducer,
  order: orderReducer,
  supplierOrder: supplierOrderReducer,
  adminOrder: adminOrderReducer,
  adminProfile: adminProfileReducer,
  supplierProfile: supplierProfileReducer,
  customerProfile: customerProfileReducer,
  adminDashboard: adminDashboardReducer,
  supplierDashboard: supplierDashboardReducer,
  customerDashboard: customerDashboardReducer,
  customerCategory: customerCategoryReducer,
});

export const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);
