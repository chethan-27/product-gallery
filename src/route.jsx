import { Routes, Route } from "react-router-dom";
import App from "./App";
import { ProductGallery } from "./product-gallery";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/product-gallery" element={<ProductGallery />} />
        </Routes>
    );
};

export default Router;
