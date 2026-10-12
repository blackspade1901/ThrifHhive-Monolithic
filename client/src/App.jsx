import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { BrowsePage } from "./pages/BrowsePage.jsx";
import { ItemDetailPage } from "./pages/ItemDetailPage.jsx";
import { CartCheckoutPage } from "./pages/CartCheckoutPage.jsx";

export function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/items/:id" element={<ItemDetailPage />} />
        <Route path="/cart" element={<CartCheckoutPage />} />
      </Routes>
    </>
  );
}
