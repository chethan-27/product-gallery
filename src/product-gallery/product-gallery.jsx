import { lazy, Suspense, useEffect, useState } from "react";
import { productsData } from '../data/products-data';
import './product-gallery.css';

const ImageComponent = lazy(() => import('../components').then(module => ({ default: module.ImageComponent })));
const ProductGallery = () => {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const dataAsync = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(productsData);
            }, 1000);
        });
    }

    const fetchData = async () => {
        try {
            // const response = await fetch('https://fakestoreapi.com/products').then(res => {
            //     if (!res.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     return res.json();
            // });
            let data = await dataAsync();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const renderSuspenseComponent = () => {
        return (
            <div
                role="status"
                aria-busy="true"
                aria-live="polite"
                style={{ padding: '1rem', fontStyle: 'italic' }}
            >
                Loading...
            </div>
        )
    }

    const renderImage = (image, title) => {
        return (
            <Suspense fallback={renderSuspenseComponent()}>
                <ImageComponent image={image} title={title} />
            </Suspense>
        );
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
                                        <div className="product-title">{product.title}</div>
                                        {renderImage(product.image, product.title)}
                                        <p>${product.price}</p>
                                        <button className="view-details-button">
                                            <a href={`/product/${product.id}`}>View Details</a>
                                        </button>
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