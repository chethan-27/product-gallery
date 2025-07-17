import { lazy, Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "./product-detail.css";
import { productsData } from "../data/products-data";

const ImageComponent = lazy(() => import('../components').then(module => ({ default: module.ImageComponent })));

const ProductDetail = () => {

    const { id } = useParams();

    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const dataAsync = (id) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(productsData.find(product => product.id === parseInt(id)));
            }, 1000);
        });
    }

    const fetchProductDetails = async () => {
        try {
            // const response = await fetch(`https://fakestoreapi.com/products/${id}`).then(res => {
            //     if (!res.ok) {
            //         throw new Error('Network response was not ok');
            //     }
            //     return res.json();
            // });
            let response = await dataAsync(id);
            setProductDetails(response);
        } catch (error) {
            console.error('Error fetching product details:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderSuspenseComponent = () => {
        return (
            <div
                role="status"
                aria-busy="true"
                aria-live="polite"
                style={{ padding: '1rem', fontStyle: 'italic' }}
            >
                Loading product details...
            </div>
        );
    };

    const renderImage = (image, title) => {
        return (
            <Suspense fallback={renderSuspenseComponent()}>
                <ImageComponent image={image} title={title} />
            </Suspense>
        );
    };

    useEffect(() => {
        fetchProductDetails();
    }, [id]);
    return (
        <div className="product-detail-container">
            {
                loading ? <p>Loading product details...</p> : (
                    <>
                        <button className="back-button">
                            <a href="/product-gallery">Back to Gallery</a>
                        </button>
                        {
                            productDetails ? (
                                <div className="product-detail">
                                    <h1>{productDetails.title}</h1>
                                    {renderImage(productDetails.image, productDetails.title)}
                                    <p>{productDetails.description}</p>
                                    <p>Category: {productDetails.category}</p>
                                    <p>Rating: {productDetails.rating.rate} ({productDetails.rating.count} reviews)</p>
                                    <p>Price: ${productDetails.price}</p>
                                </div>
                            ) : <p>Product not found</p>
                        }
                    </>
                )
            }
        </div>
    );
}

export default ProductDetail;
