import "./searchList.css";
import React from "react";
import { Link } from "react-router-dom";

const searchList = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} className="img" />
      <div className="searchDesc">
        <h1 className="searchTitle">{item.type}</h1>
        <span className="searchLoc">{item.location}</span>
        <span className="searchPrice">${item.price} per day</span>
      </div>
      <div className="searchDetails">
        {item.rating && (
          <div className="searchRating">
            <button>{item.rating}</button>
          </div>
        )}
        <div className="searchText">
          <span className="price"> ${item.price} per day </span>
          <Link to={`/cars/${item._id}`}>
            <button className="checkButton"> See availability </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default searchList;
