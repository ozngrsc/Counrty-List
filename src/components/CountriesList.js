import React, { useEffect, useState } from "react";
import axios from "../axios";

function CountriesList({ searchText, selectType }) {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const data = async () => {
      await axios
        .get(`https://restcountries.com/v2/all`)
        .then((response) => {
          console.log("response", response);
          setCountries(response.data);
        })
        .catch((error) => console.log(error));
    };
    data();
  }, []);

  const filteredCountries = countries.filter((country) => {
    if (searchText === "") {
      return countries;
    } else if (
      country.name &&
      country.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return country;
    } else if (
      country.capital &&
      country.capital.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return country;
    } else if (
      country.region &&
      country.region.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return country;
    }
    return false;
  });

  const filteredByCapital = countries.filter((country) => {
    if (searchText === "") {
      return countries;
    } else if (
      country.capital &&
      country.capital.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return country;
    }
    return false;
  });

  return (
    <div className="mt-3 mb-5 border border-3">
      <table className="table table-striped table-hover align-baseline">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Capital</th>
            <th scope="col">Region</th>
            <th scope="col">Flag</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {(selectType == 0 ? filteredCountries : filteredByCapital).map(
            (country, index) => (
              <tr key={index}>
                <th scope="row">{country.name}</th>
                <td className={!country.capital ? "ps-5" : ""}>
                  {country.capital ? country.capital : "-"}
                </td>
                <td>{country.region}</td>
                <td>
                  {" "}
                  <img
                    src={country.flag}
                    alt={country.name}
                    height={40}
                    width={60}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CountriesList;
