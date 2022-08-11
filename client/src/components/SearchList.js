import "./searchList.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const SearchList = ({ item, max, min, area, reFetch }) => {
  // const navigate = useNavigate();
  const { user, loading, error, dispatch } = useContext(AuthContext);
  // const { reFetch } = useFetch(
  //   `/cars?location=${area}&min=${min || 0}&max=${max || 999}`
  // );
  async function handleDelete() {
    // call endpoint
    const res = await axios.delete(`/cars/${item._id}`);
    console.log(res);
    reFetch();
  }
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
          {user.user.isAdmin ? (
            <button onClick={handleDelete}>Delete</button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchList;
