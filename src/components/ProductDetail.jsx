import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../UserProvider';
import productService from '../services/productService';  // You need to create these services.

function ProductDetail() {
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function fetchData() {
            try {
                const productData = await productService.getProduct(id);
                setProduct(productData);
            } catch (error) {
                console.error("Error fetching product", error);
            }
        }

        fetchData();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            await productService.addToCart(user.id, product.id, quantity);
            toast.success('Product added to cart.');
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    }

    if (!product) return <p>Loading...</p>;

    return (
        <section className="single-product border-top" style={{ minHeight: '81vh' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="single-product-slider">
                            <div className="carousel slide" data-ride="carousel" id="single-product-slider">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="/images/product-3.jpg" alt="Product 3" className="img-fluid" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/images/product-2.jpg" alt="Product 2" className="img-fluid" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/images/product-1.jpg" alt="Product 1" className="img-fluid" />
                                    </div>
                                </div>
                                <ol className="carousel-indicators">
                                    <li data-target="#single-product-slider" data-slide-to="0" className="active">
                                        <img src="/images/product-3.jpg" alt="Product 3 Thumbnail" className="img-fluid" />
                                    </li>
                                    <li data-target="#single-product-slider" data-slide-to="1">
                                        <img src="/images/product-2.jpg" alt="Product 2 Thumbnail" className="img-fluid" />
                                    </li>
                                    <li data-target="#single-product-slider" data-slide-to="2">
                                        <img src="/images/product-1.jpg" alt="Product 1 Thumbnail" className="img-fluid" />
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="single-product-details mt-5 mt-lg-0">
                            <h2>{product.name}</h2>
                            <hr />
                            <h3 className="product-price">${product.price}</h3>
                            <p className="product-description my-4">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum ipsum dicta quod, quia doloremque aut deserunt commodi quis. Totam a consequatur beatae nostrum, earum consequuntur? Eveniet consequatur ipsum dicta recusandae.
                            </p>
                            <div className="quantity d-flex align-items-center">
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={e => setQuantity(e.target.value)} 
                                    className="input-text qty text form-control w-25 mr-3" 
                                    step="1" 
                                    min="1"
                                />
                                <button onClick={handleAddToCart} className="btn btn-main btn-small">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );    
}

export default ProductDetail;