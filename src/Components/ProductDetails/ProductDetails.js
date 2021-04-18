import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import './ProductDetails.css';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://intense-hamlet-69693.herokuapp.com/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])
    
    console.log(product);
    return (
        <div>
            <h1>{productKey} details coming soon</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;