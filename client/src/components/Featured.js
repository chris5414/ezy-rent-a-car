import React from "react";
import "./featured.css";
import featured1Img from "./images/pexels-pixabay-210019.jpg";
import featured2Img from "./images/pexels-mike-b-112460.jpg";
import featured3Img from "./images/pexels-mike-b-170811.jpg";
import useFetch from "../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/cars/bytype?types=economy,luxury,7sitter"
  );

  console.log(data);

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img src={featured1Img} width="500" height="300"></img>
            <div className="featuredTitles">
              <h1>Luxury</h1>
              <h2>{data[1]} cars</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={featured2Img} width="500" height="300"></img>
            <div className="featuredTitles">
              <h1>Economy</h1>
              <h2>{data[0]} cars</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={featured3Img} width="500" height="300"></img>
            <div className="featuredTitles">
              <h1>7 Sitters</h1>
              <h2>{data[2]} cars</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
