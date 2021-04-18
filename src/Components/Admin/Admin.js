import React from 'react';
import './Admin.css';
import fakeData from '../../fakeData';

const Admin = () => {
    const handleAddProduct = () => {
        const product = {};
        fetch ('https://intense-hamlet-69693.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(fakeData)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name: </span><input type="text"/></p>
                <p><span>Price: </span><input type="text"/></p>
                <p><span>Quantity: </span><input type="text"/></p>
                <p><span>Image: </span><input type="text"/></p>
            <button onClick={handleAddProduct} className="add-btn">Checkout</button>
            </form>
            
        </div>
    );
};

export default Admin;