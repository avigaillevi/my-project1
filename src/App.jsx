import "./App.css";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import NewProduct from "./pages/NewProduct";
import Cart from "./pages/Cart";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/add" element={<NewProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
