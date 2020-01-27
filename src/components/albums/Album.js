import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { checkForContent } from "../helpers/ContentHelper";
import Spinner from "../layouts/Spinner";

const Album = props => {
  const { album, loading } = props;

  if (loading) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <div className="col-md-6">
        <Link to={`/discography/artist/album/${album.album_id}`}>
          <div className="card text-white card-album mb-4" id="card-pick">
            <div className="card-header">
              <span className="card-title"> {album.artist_name} </span> -{" "}
              <span className="card-subtitle">{album.album_name}</span>
            </div>

            <div className="card-body card-info">
              <h4>{album.album_name}</h4>
              <p className="card-text">
                <strong>
                  <i className="fas fa-heart"></i> Rating : {album.album_rating}
                </strong>
                <br />
                <strong>
                  <i className="fas fa-tag"></i> Album Label :{" "}
                  {checkForContent(album.album_label)}
                </strong>
                <br />
                <strong>
                  <i className="fas fa-history"></i> Album Release Date :{" "}
                  {checkForContent(album.album_release_date)}
                </strong>
                <br />
                <strong>
                  <i className="fas fa-dna"></i>
                  Genre :{" "}
                  {album.primary_genres.music_genre_list.length === 0
                    ? "NO GENRE AVAILABLE"
                    : album.primary_genres.music_genre_list.map(genre => (
                        <li key={Math.random()} data={genre}>
                          {genre.music_genre.music_genre_name}
                        </li>
                      ))}
                </strong>
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
};

export default Album;
