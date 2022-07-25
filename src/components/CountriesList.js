import React, { useEffect, useState } from "react";
import axios from "../axios";

function CountriesList() {
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

  return (
    <div className="container">
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
            {countries.map((country, index) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CountriesList;
