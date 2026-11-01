import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "../components/ProtectedRoute"
import BaseLayout from "../pages/BaseLayout";
import LoginPage from "../pages/LoginPage";
import ProductPage from "../pages/ProductPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import ProductEditPage from "../pages/ProductEditPage";
import UploadImagePage from "../pages/UploadImagePage";
import CategoryPage from "../pages/CategoryPage";
import StaffPage from "../pages/StaffPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<BaseLayout />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/new" element={<ProductCreatePage />} />
          <Route path="/products/:id/edit" element={<ProductEditPage />} />
          <Route path="/products/:id/upload" element={<UploadImagePage />} />
          <Route path="/categories" element={<CategoryPage />} />

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/add-user" element={<StaffPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
