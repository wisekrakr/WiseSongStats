import React from "react";
import { Link } from "react-router-dom";

let countryInfo;

const Country = props => {
  const { country } = props;

  return (
    <div className="col-md-6">
      <Link to={`/countries/country/${country.alpha2Code}`}>
        <div className="card text-white card-country mb-3" id="card-pick">
          <div
            className="card-header"
            style={{
              background: `url(${country.flag}) no-repeat center center`
            }}
          >
            <span className="card-subtitle">{country.name}</span>
            <span className="card-title" style={{ float: "right" }}>
              {country.alpha2Code}
            </span>
          </div>

          <div className="card-body card-info">
            <strong>Capital: </strong>{" "}
            <strong className="info-text"> {country.capital}</strong>
            <br />
            <strong>Population: </strong>{" "}
            <strong className="info-text"> {country.population}</strong>
            <ul className="list-group">
              <strong>
                Languages:
                {country.languages.length === 0
                  ? "NO DATA AVAILABLE"
                  : country.languages.map(language => (
                      <li
                        className="list-group-item"
                        key={Math.random()}
                        data={language}
                      >
                        {language.name}
                      </li>
                    ))}
              </strong>
            </ul>
            <ul className="list-group">
              <strong>
                Currencies:
                {country.currencies.length === 0
                  ? "NO DATA AVAILABLE"
                  : country.currencies.map(currency => (
                      <li
                        className="list-group-item"
                        key={Math.random()}
                        data={currency}
                      >
                        {currency.name}
                      </li>
                    ))}
              </strong>
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

const setCountry = text => {
  countryInfo = text;
};
export function getCountry() {
  return countryInfo;
}

export default Country;
