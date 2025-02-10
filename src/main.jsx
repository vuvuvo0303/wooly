import { createRoot } from "react-dom/client";
import "./index.css";
import App from "~/App";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <BrowserRouter basename="/">
        <App />
        <ToastContainer />
    </BrowserRouter>
);
