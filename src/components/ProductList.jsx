import React, { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom';
import productService from '../services/productService';

function ProductList({ searchTerm, page, amount, minDaysOld, maxDaysOld, orderBy}) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refreshProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await productService.getAll({ searchTerm, page, amount, minDaysOld, maxDaysOld, orderBy});
            setProducts(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, page, amount, minDaysOld, maxDaysOld, orderBy]);

    useEffect(() => {
        refreshProducts();
    }, [refreshProducts]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="row">
            {products.map(product => (
                <div key={product.id} className="col-lg-4 col-12 col-md-6 col-sm-6 mb-5" >
                    <div className="product">
                        <div className="product-wrap">
                            <Link to={`${product.id}`}><img className="img-fluid w-100 mb-3 img-first" src="/images/322.jpg" alt={product.name} /></Link>
                            <Link to={`${product.id}`}><img className="img-fluid w-100 mb-3 img-second" src="/images/444.jpg" alt={product.name} /></Link>
                        </div>

                        <div className="product-info">
                            <h2 className="product-title h5 mb-0"><Link to={`${product.id}`}>{product.name}</Link></h2>
                            <span className="price">
                                ${product.price}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductList;