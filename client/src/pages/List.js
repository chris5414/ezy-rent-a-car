import React, { useState } from "react";
import "./list.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SearchList from "../components/SearchList";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import useFetch from "../hooks/useFetch";

const List = () => {
  const location = useLocation();
  console.log(location);

  const [area, setArea] = useState(location.state.area);
  const [dates, setDates] = useState(location.state.dates);
  const [option, setOption] = useState(location.state.option);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/cars?location=${area}&min=${min || 0}&max=${max || 999}`
  );

  const getDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  const allDates = getDates(dates[0].startDate, dates[0].endDate);

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="listTitle">Search</h1>
            <div className="item">
              <label>Location</label>
              <input type="text" placeholder={area} />
            </div>
            <div className="item">
              <label>Date Range</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  ranges={dates}
                  minDate={new Date()}
                />
              )}
            </div>
            <div className="item">
              <label>Options</label>
              <div className="options">
                <div className="optionItem">
                  <span className="optionText">Min Price</span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="optionInput"
                  />
                </div>
                <div className="optionItem">
                  <span className="optionText">Max Price</span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="optionInput"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "Loading please wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchList
                    area={area}
                    min={min}
                    max={max}
                    item={item}
                    reFetch={reFetch}
                    key={item._id}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
