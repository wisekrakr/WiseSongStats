import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";

const Artist = props => {
  const { artist, loading } = props;

  if (loading) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <div className="col-md-6">
        <Link to={`/discography/artist/${artist.artist_id}`}>
          <div className="card text-white card-artist mb-4" id="card-pick">
            <div className="card-header">
              <h5 className="card-subtitle">{artist.artist_name}</h5>
            </div>
            <div className="card-body card-info">
              <p className="card-text">
                <strong>
                  <i className="fas fa-flag"></i> Artist Country :{" "}
                  {artist.artist_country === ""
                    ? "NO DATA AVAILABLE"
                    : artist.artist_country}
                </strong>
                <br />

                <strong>
                  <i className="fas fa-list"></i> Artist Aliases :{" "}
                  {artist.artist_alias_list.length === 0
                    ? "NO DATA AVAILABLE"
                    : artist.artist_alias_list.map(alias => (
                        <li key={Math.random()} data={alias}>
                          {alias.artist_alias}
                        </li>
                      ))}
                </strong>
                <br />
                <strong>
                  <i className="fas fa-heart"></i> Artist Rating :
                  {artist.artist_rating}
                </strong>
                <br />
                <strong>
                  <i className="fab fa-twitter"></i> Artist Twitter :
                  {artist.artist_twitter_url !== ""
                    ? artist.artist_twitter_url
                    : "NO DATA AVAILABLE"}
                </strong>
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default Artist;
