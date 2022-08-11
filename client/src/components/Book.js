import "./book.css";
import React from "react";

const Book = ({ carId, setOpen }) => {
  return (
    <div className="book">
      <div className="container">
        <button className="button" onClick={() => setOpen(false)} />
        <span>Booking is Successful !</span>
      </div>
    </div>
  );
};

export default Book;
