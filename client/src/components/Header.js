import React, { useContext, useState } from "react";
import "./header.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Header = () => {
  const [openDate, setOpenDate] = useState(false);
  const [area, setArea] = useState("");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { area, dates } });
    navigate("/list", { state: { area, dates } });
  };

  return (
    <div className="header">
      <div className="headerList">
        <p className="headerDesc">Find and Rent your Dream Car!</p>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <select
              className="headerSearchInput"
              onChange={(e) => setArea(e.target.value)}
              value={area}
            >
              <option value="none">Please Select</option>
              <option value="west">West</option>
              <option value="east">East</option>
              <option value="central">Central</option>
              <option value="north">North</option>
              <option value="south">South</option>
            </select>
          </div>
          <div className="headerSearchItem">
            <span
              onClick={() => setOpenDate(!openDate)}
              className="headerSearchText"
            >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
              dates[0].endDate,
              "MM/dd/yyyy"
            )}`}</span>
            {openDate && (
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dates}
                minDate={new Date()}
              />
            )}
          </div>
          <button className="headerBtn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
