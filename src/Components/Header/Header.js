import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="row header-section">
      <div className="col-md-6">
        <h1 className="site-title">Daraz Lite</h1>
      </div>

      <div className="col-md-6">
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/form">Form</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/deals">Deals</Link>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
