import React from "react";
import "./scss/app.scss";
import { Home } from "../src/pages/Home";
import Cart from "./pages/Cart";
import NotFound404 from "./pages/NotFound";
import PizzaPage from "./pages/PizzaPage";
import { Route, Routes, Outlet } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<PizzaPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Route>
    </Routes>
  );
}

export default App;
