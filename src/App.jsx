import { Route, Routes } from "react-router-dom";
import "./index.css";
import NotFound from "./pages/404/NotFound";
import Product from "./pages/Products/_id";
import Auth from "./pages/Auth/Auth";
function App() {
    return (
        <Routes>
            {/* Product detail page  */}
            <Route path="/products/:productId" element={<Product />} />

            {/* Authentication */}
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />

            {/* 404 not found page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
