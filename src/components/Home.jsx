import React from 'react'
import ProductList from './ProductList';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <div className="main-slider slider">
                <div className="slider-item">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-12 offset-lg-6 offset-md-6">
                                <div className="slider-caption">
                                    <span className="lead">Winter Collection Sale </span>
                                    <h1 className="mt-2 mb-5"><span className="text-color">70% off </span>to everything</h1>
                                    <Link to="/products" className="btn btn-main">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="features border-top border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-ion-android-bicycle"></i>
                                <div className="content">
                                    <h5>Free Shipping</h5>
                                    <p>On all orders</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-wallet"></i>
                                <div className="content">
                                    <h5>30 Days Return</h5>
                                    <p>Money back Guarantee</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-key"></i>
                                <div className="content">
                                    <h5>Secure Checkout</h5>
                                    <p>100% Protected by paypal</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="feature-block">
                                <i className="tf-clock"></i>
                                <div className="content">
                                    <h5>24/7 Support</h5>
                                    <p>Customer support at all times</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section products-main p-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="title text-center">
                                <h2>New releases</h2>
                                <p>These are our new items in the shop!</p>
                            </div>
                        </div>
                    </div>
                    <ProductList page={1} amount={6} maxDaysOld={7}/>
                </div>
            </section>
        </>
    );
}