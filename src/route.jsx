import { Routes, Route } from "react-router-dom";
import App from "./App";
import { ProductGallery } from "./product-gallery";
import { ProductDetail } from "./product-detail";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/product-gallery" element={<ProductGallery />} />
            <Route path="product/:id" element={<ProductDetail />} />
        </Routes>
    );
};

export default Router;
