import { useEffect, useState } from "react";
import './product-gallery.css';

const ProductGallery = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setLoading(false);
        setProducts(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="product-gallery-container">
            {
                loading ? <p>Loading...</p> : (
                    <div className="product-gallery">
                        {
                            products.length === 0
                                ? <p>No products available</p>
                                : products.map(product => (
                                    <div key={product.id} className="product-item">
                                        <h2>{product.title}</h2>
                                        <img src={product.image} alt={product.title} />
                                        <p>${product.price}</p>
                                    </div>
                                ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default ProductGallery;