import React, { useEffect } from 'react';
import './Home.css';
import { useState } from 'react';
import Product from '../Product/Product';
import Search from '../Search/Search';
import Cart from '../Cart/Cart';
import addToDatabaseCart, { getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://intense-hamlet-69693.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    })

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('https://intense-hamlet-69693.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {
              'content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
          })
          .then(res => res.json())
          .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);       
        addToDatabaseCart(product.key, count);
    }

    return (
        <div>
            <Search></Search>
        <div className="shop-container">    
            <div className="product-container">
            {
                products.map(pd => <Product key={pd.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
            }
            </div>
            <div className="cart-container">
               <Cart cart = {cart}>
               </Cart>
            </div>
        </div>
        </div>
    );
};

export default Home;
