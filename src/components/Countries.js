import React, { useState } from "react";
import CountriesList from "./CountriesList";

function Countries() {
  const [searchText, setSearchText] = useState("");
  const [selectType, setSelectType] = useState(0);

  const optionChange = (e) => {
    setSelectType(e.target.value);
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center search mb-0">
        <div className="input-group mt-5 ">
          <select
            className="options w-25 rounded-start border border-secondry selectButton"
            onChange={optionChange}
            value={selectType}
          >
            <option value="0">All</option>
            <option value="1">Capital</option>
          </select>
          <input
            type="text"
            className="form-control"
            placeholder={
              selectType == 0
                ? "Search (Name / Capital / Region)"
                : "Search by Capital"
            }
            aria-label="Search"
            aria-describedby="button-addon2"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <CountriesList searchText={searchText} selectType={selectType} />
    </div>
  );
}

export default Countries;
