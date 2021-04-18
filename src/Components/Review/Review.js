import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { getDatabaseCart, removeFromDatabaseCart } from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";
import "./Review.css";

const Review = () => {
  const [cart, setCart] = useState([]);
  const history = useHistory();

  const handleProceedCheckout = () => {
    history.push('/orders');
  }


  const removeProduct = (productKey) => {
      const newCart = cart.filter(pd => pd.key !== productKey);
      setCart(newCart);
      removeFromDatabaseCart(productKey);
};


  useEffect(() => {
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
  }, []);


  return (
    <div className="shop-container">
        <div className="product-container">
      {
      cart.map((pd) => (
        <ReviewItems removeProduct = {removeProduct} product={pd}></ReviewItems>))
      }
      </div>

      <div className="cart-container">
        <Cart cart={cart}>
            <button onClick={handleProceedCheckout} className="add-btn">Checkout</button>
        </Cart>
      </div>
    </div>
  );
};

export default Review;
