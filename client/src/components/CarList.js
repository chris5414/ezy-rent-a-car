import React from "react";
import "./carList.css";
import useFetch from "../hooks/useFetch";

const CarList = () => {
  const { data, loading, error } = useFetch("/cars/bylocation");

  const images = [
    "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=800",

    "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  return (
    <div className="carList">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data &&
            images.map((img, i) => (
              <div className="carListItem" key={i}>
                <img src={img} className="carListImg" />

                <div className="carListTitles">
                  <h1>{data[i]?.location}</h1>
                  <h2>{data[i]?.count} cars</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default CarList;
