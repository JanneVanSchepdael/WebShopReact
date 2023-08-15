import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../UserProvider';
import cartService from '../services/cartService';

function Cart(){
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState(null);
    

    useEffect(() => {
        // Fetching cart data from the cartApi
        const fetchCart = async () => {
            if (user) {
                try {
                    const cartData = await cartService.getCart(user.id);
                    setCart(cartData);
                } catch (error) {
                    console.error("Error fetching cart data:", error);
                }
            }
        };
        fetchCart();
    }, [user]);

    const computeTotalPrice = () => {
        return cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2);
    };

    const quantityChanged = (item, newQuantity) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            const updatedItem = { ...item };
            updatedItem.quantity = parseInt(newQuantity);
            updatedCart.items = updatedCart.items.map(i => i.id === item.id ? updatedItem : i);
            return updatedCart;
        });

        try{
            cartService.editCart(cart);
        } catch(error){
            toast.error("Error updating cart.");
        }
    };

    const confirmDelete = async (item) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try{
                const updatedCart = { ...cart };
                updatedCart.items = updatedCart.items.filter(i => i.id !== item.id);
                setCart(updatedCart);

                await cartService.editCart(cart);
                toast.success("Product removed from cart.");
            } catch (error) {
                toast.error("Error removing item from cart.");
            }
           
        }
    };

    const order = () => {
        toast.info("This function has not been implemented.");
    };


    return (
        <section className="cart shopping page-wrapper border-top py-4" style={{ minHeight: '81vh' }}>
            {cart && (
                <div className="container">
                    <h2 className="py-2">My Cart</h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="product-list">
                                <form className="cart-form">
                                    <table className="table shop_table shop_table_responsive cart" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail"> </th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Total</th>
                                                <th className="product-remove"> </th>
                                            </tr>
                                        </thead>
    
                                        <tbody>
                                            {cart.items.map(item => (
                                                <tr className="cart_item" key={item.id}>
                                                    <td className="product-thumbnail" data-title="Thumbnail">
                                                        <Link to={`/products/${item.product.id}`}>
                                                            <img src="/images/cart-1.jpg" className="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" />
                                                        </Link>
                                                    </td>
    
                                                    <td className="product-name" data-title="Product">
                                                        <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                                                    </td>
    
                                                    <td className="product-price" data-title="Price">
                                                        <span className="amount">
                                                            ${item.product.price.toFixed(2)}
                                                        </span>
                                                    </td>
    
                                                    <td className="product-quantity" data-title="Quantity">
                                                        <input type="number" min="1" name={`product-quantity-${item.id}`} value={item.quantity} onChange={(e) => {
                                                            quantityChanged(item, e.target.value)
                                                        }} />
                                                        <button className="remove-button" onClick={() => confirmDelete(item)}>X</button>
                                                    </td>
    
                                                    <td className="product-subtotal" data-title="Total">
                                                        <span className="amount">
                                                            ${parseFloat(item.product.price * item.quantity).toFixed(2)}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="col-lg-4">
                            <div className="cart-info card p-4 mt-4">
                                <h4 className="mb-4">Cart totals</h4>
                                <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Subtotal</h5>
                                        <span>${computeTotalPrice()}</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2 mb-3">
                                        <h5>Shipping</h5>
                                        <span>Free</span>
                                    </li>
                                    <li className="d-flex justify-content-between pb-2">
                                        <h5>Total</h5>
                                        <span>${computeTotalPrice()}</span>
                                    </li>
                                </ul>
                                <button onClick={order} className="btn btn-main btn-small">Proceed to checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
    
}

export default Cart;