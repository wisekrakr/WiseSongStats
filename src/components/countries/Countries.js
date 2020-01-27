import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Country from "./Country";

const Countries = () => {
  const [country_list, setCountryList] = useState({});

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        const countries = res.data;
        setCountryList(countries);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (country_list === undefined || Object.keys(country_list).length === 0) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light btn-sm mb-4">
          Go Home
        </Link>
        <div className="container">
          <h3 className="text-center text-xl">Countries </h3>
          <div className="row">
            {country_list.map(country => {
              return <Country key={country.numericCode} country={country} />;
            })}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Countries;
