import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import NotFound from "./pages/404/NotFound";
import Product from "./pages/Products/_id";
import Auth from "./pages/Auth/Auth";
import Collection from "./pages/Products/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/OrderHistory";
import Home from "./pages/Home";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>

        {/* Product detail page  */}
        <Route path="/products/:productId" element={<Product />} />

        {/* Authentication */}
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/forgotPW" element={<Auth />} />

        {/* 404 not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Provider>
  );
}

export default App;
