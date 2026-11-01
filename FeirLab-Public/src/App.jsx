import { BrowserRouter, Route, Routes } from "react-router";
import BaseLayout from "../pages/BaseLayout";
import DetailPage from "../pages/DetailPage";
import HomePage from "../pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/:id" element={<DetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
