import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";

const Song = props => {
  const { song, loading } = props;

  if (loading) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    return song.has_lyrics === 0 ? null : (
      <div className="col-md-6">
        <Link to={`/lyrics/song/${song.track_id}`}>
          <div className="card text-white card-song mb-3" id="card-pick">
            <div className="card-header">
              <span className="card-title"> {song.artist_name} </span> -{" "}
              <span className="card-subtitle">{song.track_name}</span>
            </div>

            <div className="card-body card-info">
              <h4>
                <i className="fas fa-play"></i> Song : {song.track_name}
              </h4>
              <p className="card-text">
                <br />
                <strong>
                  <i className="fas fa-list"></i> Album : {song.album_name}
                </strong>
                <br />
                <strong>
                  <i className="fas fa-heart"></i> Favorited :{" "}
                  {song.num_favourite}
                </strong>
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default Song;
