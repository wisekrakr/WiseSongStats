import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import { trimNonsenseText } from "../helpers/TextHelper";
import { checkForContent } from "../helpers/ContentHelper";

const Lyrics = props => {
  const [song, setSong] = useState({});
  const [lyrics, setLyrics] = useState({});
  const [songInfo, setSongInfo] = useState({});

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}track.lyrics.get?
      track_id=${props.match.params.id}&
      apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}track.get?
        track_id=${props.match.params.id}&
        apikey=${process.env.REACT_APP_API_KEY}`
        )
      ])

      .then(res => {
        let lyrics = res[0].data.message.body.lyrics;
        setLyrics({ lyrics });
        let song = res[1].data.message.body.track;
        setSong({ song });

        return axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${process.env.REACT_APP_LAST_KEY}&artist=${song.artist_name}&track=${song.track_name}&format=json`
        );
      })
      .then(res => {
        let songInfo = res.data.track;
        setSongInfo(songInfo);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  if (
    song === undefined ||
    lyrics === undefined ||
    Object.keys(song).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light btn-sm mb-4">
          Go Home
        </Link>
        <div className="container">
          <div className="card card-lyric">
            <h5 className="card-header ">
              {song.song.track_name} by{" "}
              <Link
                to={`/discography/artist/${song.song.artist_id}`}
                className="btn med-btn"
              >
                {song.song.artist_name}{" "}
              </Link>
            </h5>

            {/* Start Lyrics collapsible */}

            <div className="wrap-collabsible">
              <input id="collapsible" className="toggle" type="checkbox" />
              <label htmlFor="collapsible" className="lbl-toggle toggle-lyrics">
                Lyrics
              </label>

              <div className="collapsible-content">
                <div className="content-inner">
                  {lyrics.lyrics.lyrics_body.split("\n").map((lyric, i) => {
                    return (
                      <p key={i} data={lyric}>
                        {lyric}
                      </p>
                    );
                  })}
                  <label htmlFor="collapsible" className="lbl-toggle ">
                    Close
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* End Lyrics collapsible */}

          {/* Start Song Info */}
          <div className="card">
            <div className="container ">
              <h3 className="x-small-heading">Song Trivia</h3>
              <ul className="list-group info-list">
                <li className="list-group-item">
                  {songInfo === undefined ||
                  Object.keys(songInfo).length === 0 ||
                  songInfo.wiki === undefined ||
                  songInfo.wiki.content === "NO DATA AVAILABLE"
                    ? "NO DATA AVAILABLE"
                    : trimNonsenseText(songInfo.wiki.content)}
                </li>
              </ul>
              <ul className="list-group info-list">
                <h3 className="x-small-heading">Genre(s):</h3>

                {songInfo === undefined ||
                Object.keys(songInfo).length === 0 ||
                songInfo.toptags.tag.length === 0
                  ? "NO DATA AVAILABLE"
                  : songInfo.toptags.tag.map(genre => (
                      <li
                        className="list-group-item"
                        key={Math.random()}
                        data={genre}
                      >
                        {genre.name}
                      </li>
                    ))}

                {/* {console.log(songInfo.toptags)} */}
              </ul>
              <h3 className="x-small-heading">Additional Info:</h3>
              <ul className="list-group info-list">
                <li className="list-group-item">
                  <strong>Album </strong> :
                  <strong className="info-text">
                    {checkForContent(song.song.album_name)}
                  </strong>
                </li>
                <li className="list-group-item">
                  <strong>Release Date </strong> :
                  <strong className="info-text">
                    {songInfo === undefined ||
                    Object.keys(songInfo).length === 0 ||
                    songInfo.wiki === undefined ||
                    songInfo.wiki.published === "NO DATA AVAILABLE"
                      ? "NO DATA AVAILABLE"
                      : checkForContent(songInfo.wiki.published)}
                  </strong>
                </li>
                <li className="list-group-item">
                  <strong>Song Rating </strong> :
                  <strong className="info-text">
                    {checkForContent(song.song.track_rating)}
                  </strong>
                </li>
                <li className="list-group-item">
                  <strong>Song Listeners </strong> :
                  <strong className="info-text">
                    {songInfo === undefined ||
                    Object.keys(songInfo).length === 0
                      ? "NO DATA AVAILABLE"
                      : checkForContent(songInfo.listeners)}
                  </strong>
                </li>
                <li className="list-group-item">
                  <strong>Song Playcount </strong> :
                  <strong className="info-text">
                    {songInfo === undefined ||
                    Object.keys(songInfo).length === 0
                      ? "NO DATA AVAILABLE"
                      : checkForContent(songInfo.playcount)}
                  </strong>
                </li>
                <li className="list-group-item">
                  <strong>Explicit Lyrics </strong> :
                  <strong className="info-text">
                    {song.song.explicit === 0 ? "No" : "Yes"}
                  </strong>
                </li>
              </ul>
            </div>
          </div>
          {/* End Song Info */}
        </div>
      </Fragment>
    );
  }
};

export default Lyrics;
