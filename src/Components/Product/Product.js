import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Product = (props) => {
  console.log(props);
  const { img, name, price, key } = props.product;
  return (
    <div>
      <div className="product">
        <img src={img} alt="" />
        <h4><Link to={"/product/"+key}>{name}</Link></h4>
        <p>price: ${price}</p>
        { props.showAddToCart && <button className="add-btn" onClick={() => props.handleAddProduct(props.product)}><FontAwesomeIcon icon={faShoppingCart} />Add To Cart</button>}
      </div>
    </div>
  );
};

export default Product;
