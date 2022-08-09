import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./car.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Book from "../components/Book";

const Car = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [open, setOpen] = useState(false);

  const { data, loading, error } = useFetch(`/cars/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates } = useContext(SearchContext);
  console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDiff = (date1, date2) => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };
  console.log(dayDiff(dates[0].endDate, dates[0].startDate));

  const days = dayDiff(dates[0].endDate, dates[0].startDate);

  const handleClick = () => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading please wait"
      ) : (
        <div className="carContainer">
          <div className="carWrapper">
            <h1 className="carTitle">{data.type}</h1>
            <div className="carImages">
              {data.photos?.map((photo) => (
                <div className="imgWrapper">
                  <img src={photo} className="carImg" />
                </div>
              ))}
            </div>
            <div className="carDetails">
              <div className="carDetailsTexts">
                <h1 className="carTitle">{data.type}</h1>
                <p className="carDesc">{data.desc}</p>
              </div>
              <div className="carDetailsPrice">
                <h2>
                  <b>${data.price * days}</b> ({days} days)
                </h2>
                <button onClick={handleClick}>Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {open && <Book carId={id} />}
    </div>
  );
};

export default Car;
