import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div>
            <h2>{name}</h2>
            <h4>Quantity: {quantity}</h4>
            <p>price: {price} </p>
            <button className="add-btn" onClick={props.removeProduct}>Remove</button>
        </div>
    );
};

export default ReviewItems;