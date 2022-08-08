import axios from "../axios";
import React, { useEffect, useState } from "react";
import CountriesList from "./CountriesList";

function Countries() {
  const [searchText, setSearchText] = useState("");
  const [selectType, setSelectType] = useState(0);
  const [countries, setCountries] = useState([]);
  const [searchObjects, setSearchObjects] = useState([]);

  useEffect(() => {
    const data = async () => {
      await axios
        .get(`https://restcountries.com/v2/all`)
        .then((response) => {
          setCountries(response.data);
          setSearchObjects(response.data);
        })
        .catch((error) => console.log(error));
    };
    data();
  }, []);

  const optionChange = (e) => {
    setSelectType(e.target.value);
  };

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchText), "i");
    const filteredRows = countries.filter((country) => {
      return Object.keys(country).some((field) => {
        return searchRegex.test(country[field].toString());
      });
    });
    setSearchObjects(filteredRows);
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
            onChange={(event) => requestSearch(event.target.value)}
          />
        </div>
      </div>
      <CountriesList
        searchText={searchText}
        selectType={selectType}
        countries={countries}
        searchObjects={searchObjects}
      />
    </div>
  );
}

export default Countries;
