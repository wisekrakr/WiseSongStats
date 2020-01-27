import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Song from "../songs/Song";
import { checkForContent } from "../helpers/ContentHelper";
import { trimNonsenseText } from "../helpers/TextHelper";

const Albums = props => {
  const [album, setAlbum] = useState({});
  const [songs, setSongs] = useState({});
  const [extraInfo, setExtraInfo] = useState({});

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}album.get?
        album_id=${props.match.params.id}&
        apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}album.tracks.get?
        album_id=${props.match.params.id}&page_size=30&page=1&
        apikey=${process.env.REACT_APP_API_KEY}`
        )
      ])
      .then(res => {
        let album = res[0].data.message.body.album;
        setAlbum({ album });
        let songs = res[1].data.message.body.track_list;
        setSongs({ songs });

        return axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${process.env.REACT_APP_LAST_KEY}&artist=${album.artist_name}&album=${album.album_name}&format=json`
        );
      })
      .then(res => {
        const info = res.data.album;
        setExtraInfo(info);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  if (
    album === undefined ||
    Object.keys(album).length === 0 ||
    songs === undefined ||
    Object.keys(songs).length === 0 ||
    extraInfo === undefined ||
    Object.keys(extraInfo).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link
          to={`/discography/artist/${album.artist_id}`}
          className="btn btn-light btn-sm mb-4"
        >
          Go Home
        </Link>
        {/*START ARTIST JUMBOTRON */}
        <div className="jumbotron jumbo-manual bg-secondary-dark">
          <h3 className="large-heading">{album.album.album_name}</h3>
          <h3 className="x-small-heading">{album.album.artist_name}</h3>
          <p className="heading-underline" />
          <div className="row row-disco">
            <div className="col-disco">
              <ul className="list-group">
                <strong>
                  {" "}
                  <i className="fas fa-play"></i> Album Info
                </strong>
                <li className="list-group-item">
                  Track Count :{checkForContent(extraInfo.tracks.track.length)}
                </li>
                <li className="list-group-item">
                  Album Release Date:
                  {checkForContent(extraInfo.wiki.published)}
                </li>
                <li className="list-group-item">
                  Label : {checkForContent(album.album.album_label)}
                </li>
                <li className="list-group-item">
                  Album Rating:{checkForContent(album.album.album_rating)}
                </li>
              </ul>
            </div>
            <div className="col-disco">
              <strong>
                {" "}
                <i className="fas fa-info"></i> Additional Info
              </strong>
              <ul className="list-group">
                {extraInfo.tags.tag.length === 0
                  ? "NO GENRE AVAILABLE"
                  : extraInfo.tags.tag.map(genre => (
                      <li
                        key={Math.random()}
                        data={genre}
                        className="list-group-item"
                      >
                        {genre.name}
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
        {/*END ARTIST JUMBOTRON */}

        {/* Start Extra Info*/}
        {extraInfo.wiki.content === "" ? (
          ""
        ) : (
          <div className="wrap-collabsible">
            <input id="collapsible" className="toggle" type="checkbox" />
            <label htmlFor="collapsible" className="lbl-toggle toggle-bio">
              The Story behind the Music
            </label>

            <div className="collapsible-content">
              <div className="content-inner ">
                {trimNonsenseText(extraInfo.wiki.content)
                  .split("\n")
                  .map((text, i) => {
                    return (
                      <p key={i} data={text}>
                        {text}
                      </p>
                    );
                  })}
                <label htmlFor="collapsible" className="lbl-toggle ">
                  Close
                </label>
              </div>
            </div>
          </div>
        )}
        {/* END BIO */}

        <div className="container">
          <div className="row ">
            {songs.songs.length === 0 ? (
              <div className="alert alert-danger ml-3">
                <strong>NO SONGS AVAILABLE... </strong>
              </div>
            ) : (
              songs.songs.map(item => (
                <Song key={item.track.track_id} song={item.track} />
              ))
            )}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Albums;
