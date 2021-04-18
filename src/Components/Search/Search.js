import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <div>
      <form className="col-md-6 m-auto py-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a keyword for product ..."
          ></input>
          <div className="input-group-append">
            <button id="search-btn" type="button" className="btn">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
