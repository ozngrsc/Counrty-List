import React from "react";

function CountriesList({ searchText, selectType, countries, searchObjects }) {
  // eslint-disable-next-line no-extend-native
  String.prototype.turkishToEnglish = function () {
    var string = this;
    var letters = {
      i: "i",
      ı: "i",
      ş: "s",
      ğ: "g",
      ü: "u",
      ö: "o",
      ç: "c",
    };
    string = string.toLowerCase().replace(/(([iışğüöç]))/g, function (letter) {
      return letters[letter];
    });
    return string;
  };

  const filteredByCapital = countries.filter((country) => {
    if (searchText === "") {
      return countries;
    } else if (
      country.capital &&
      country.capital.turkishToEnglish().includes(searchText.turkishToEnglish())
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
          {(selectType == 0 ? searchObjects : filteredByCapital).map(
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
