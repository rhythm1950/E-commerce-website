import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const productPrice = cart.reduce((total, prd) => total + prd.price, 0);
    const finalProductPrice = Math.round(productPrice);
    const tax = Math.round(productPrice * 0.1);
    const finalTotal = Math.round(finalProductPrice + tax);
    return (
        <div>
            <h3>this is cart</h3>
            <p>Items Ordered: {cart.length} </p>
            <p>Product price: {finalProductPrice}</p>
            <p>Tax: {tax}</p>
            <p>Total price: {finalTotal}</p>
            <Link to="/review">
                       <button className="add-btn">Review Order</button>
                   </Link>
        </div>
    );
};

export default Cart;