import React from "react";
import "./favCars.css";
import useFetch from "../hooks/useFetch";

const FavCars = () => {
  const { data, loading, error } = useFetch("/cars?featured=true&limit=3");

  return (
    <div className="favCars">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data.map((item) => (
            <div className="favItem" key={item._id}>
              <img src={item.photos[0]} />
              <span className="favName">{item.type}</span>
              <span className="favLocation">{item.location}</span>
              <span className="favPrice">${item.price}/day</span>
              {item.rating && (
                <div className="favRating">
                  <button>{item.rating}</button>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FavCars;
