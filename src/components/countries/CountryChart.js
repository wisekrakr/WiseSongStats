import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Song from "../songs/Song";
import Artist from "../artists/Artist";
import Spinner from "../layouts/Spinner";
import { checkForContent } from "../helpers/ContentHelper";

const CountryChart = props => {
  const [country, setCountry] = useState({});
  const [countrySongChart, setCountrySongChart] = useState({});
  const [countryArtistChart, setCountryArtistChart] = useState({});

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}chart.tracks.get?
        ${process.env.REACT_APP_TOP_TEN}&
        country=${props.match.params.id}&f_has_lyrics=1&
        f_has_lyrics=1&
        apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}chart.artists.get?
        ${process.env.REACT_APP_TOP_TEN}&
        country=${props.match.params.id}&
        f_has_lyrics=1&
        apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `https://restcountries.eu/rest/v2/alpha/${props.match.params.id}`
        )
      ])
      .then(res => {
        const song_list = res[0].data.message.body.track_list;
        setCountrySongChart(song_list);
        const artist_list = res[1].data.message.body.artist_list;
        setCountryArtistChart(artist_list);
        const country = res[2].data;
        setCountry(country);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  if (
    countrySongChart === undefined ||
    Object.keys(countrySongChart).length === 0 ||
    countryArtistChart === undefined ||
    Object.keys(countryArtistChart).length === 0 ||
    country === undefined ||
    Object.keys(country).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/countries/" className="btn btn-light btn-sm mb-4">
          Go Back
        </Link>

        {/*START ARTIST JUMBOTRON */}
        <div
          className="jumbotron jumbo-manual"
          style={{
            background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${country.flag}) no-repeat center`,
            height: "100%",
            backgroundSize: "cover"
          }}
        >
          <h1 className="jumbo-header mb-2">
            {country.name} / {country.nativeName}
          </h1>
          <p className="heading-underline" />
          <div className="row row-disco">
            <div className="col-disco">
              <ul className="list-group">
                <strong>
                  {" "}
                  <i className="fas fa-flag"></i> Country Info
                </strong>
                <li className="list-group-item">
                  Capital : {checkForContent(country.capital)}
                </li>
                <li className="list-group-item">
                  Population : {checkForContent(country.population)}
                </li>
                <li className="list-group-item">
                  Languages :{" "}
                  {country.languages.length === 0
                    ? "NO DATA"
                    : country.languages.map(language => (
                        <div key={Math.random()} data={language}>
                          {language.name}
                        </div>
                      ))}
                </li>
              </ul>
            </div>
            <div className="col-disco">
              <ul className="list-group">
                <strong>
                  {" "}
                  <i className="fas fa-globe"></i> Regional Info
                </strong>
                <li className="list-group-item">
                  Country Region : {checkForContent(country.region)}
                </li>
                <li className="list-group-item">
                  Country Subregion : {checkForContent(country.subregion)}
                </li>
                <li className="list-group-item">
                  Country Regional Block :{" "}
                  {country.regionalBlocs.length === 0
                    ? "NO DATA"
                    : country.regionalBlocs.map(bloc => (
                        <div key={Math.random()} data={bloc}>
                          {bloc.name}
                        </div>
                      ))}
                </li>
              </ul>
            </div>
            <div className="col-disco">
              <ul className="list-group">
                <strong>
                  {" "}
                  <i className="fas fa-info"></i> Additional Info
                </strong>
                <li className="list-group-item">
                  Coordinates : {checkForContent(country.latlng[0])},{" "}
                  {checkForContent(country.latlng[1])}
                </li>
                <li className="list-group-item">
                  Alternate Spellings :{" "}
                  {country.altSpellings.length === 0
                    ? "NO DATA AVAILABLE"
                    : country.altSpellings.map(spelling => (
                        <div key={Math.random()} data={spelling}>
                          {spelling}
                        </div>
                      ))}
                </li>
                <li className="list-group-item">
                  Currencies :{" "}
                  {country.currencies.length === 0
                    ? "NO DATA AVAILABLE"
                    : country.currencies.map(currency => (
                        <div key={Math.random()} data={currency}>
                          {currency.name}
                        </div>
                      ))}
                </li>
              </ul>
            </div>
          </div>
          <div className="row mt-4">
            <a href="#top_songs" className="btn med-btn ">
              Top Songs
            </a>
            <a href="#top_artists" className="btn med-btn ">
              Top Artists
            </a>
          </div>
        </div>
        {/*END ARTIST JUMBOTRON */}

        <div className="container">
          <h3 className="text-center w-100 bg-light p-4 mb-4" id="top_songs">
            Top Songs in {country.name}
          </h3>
          <div className="row ">
            {countrySongChart.length === 0 ? (
              <div className="alert alert-danger ml-3">
                <strong>NO TOP 10 SONGS YET... </strong>
              </div>
            ) : (
              countrySongChart.map(item => (
                <Song key={item.track.track_id} song={item.track} />
              ))
            )}
          </div>

          <h3 className="text-center w-100 bg-light p-4 mb-4" id="top_artists">
            Top Artists in {country.name}
          </h3>
          <div className="row">
            {countryArtistChart.length === 0 ? (
              <div className="alert alert-danger ml-3">
                <strong>NO TOP 10 ARTISTS YET... </strong>
              </div>
            ) : (
              countryArtistChart.map(item => (
                <Artist key={item.artist.artist_id} artist={item.artist} />
              ))
            )}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default CountryChart;
