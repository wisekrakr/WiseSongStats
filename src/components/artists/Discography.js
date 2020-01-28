import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../layouts/Spinner";
import Song from "../songs/Song";
import Artist from "../artists/Artist";
import Album from "../albums/Album";
import { trimNonsenseText } from "../helpers/TextHelper";
import { checkForContent } from "../helpers/ContentHelper";

const Discography = props => {
  const [artist, setArtist] = useState({});
  const [songs, setSongs] = useState({});
  const [albums, setAlbums] = useState({});
  const [related_artists, setRelatedArtists] = useState({});
  const [lastfm_artist, setLastfmArtist] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axios.all([
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}artist.get?
        artist_id=${props.match.params.id}&
        apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}track.search?
          f_artist_id=${props.match.params.id}&
          s_track_rating=desc&page_size=20&page=1&f_has_lyrics=1&
          apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}artist.albums.get?
          artist_id=${props.match.params.id}&
          s_release_date=asc&
          apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}artist.related.get?
          artist_id=${props.match.params.id}&
          apikey=${process.env.REACT_APP_API_KEY}`
        )
      ]);

      let artist = res[0].data.message.body.artist;
      setArtist({ artist });
      let songs = res[1].data.message.body.track_list;
      setSongs({ songs });
      let albums = res[2].data.message.body.album_list;
      setAlbums({ albums });
      let related_artists = res[3].data.message.body.artist_list;
      setRelatedArtists({ related_artists });

      const res2 = await axios.get(
        `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist.artist_name}&api_key=${process.env.REACT_APP_LAST_KEY}&format=json`
      );

      let lastfm_artist = res2.data.artist;
      setLastfmArtist({ lastfm_artist });

      setLoading(false);
    };

    getData();
  }, [props.match.params.id]);

  if (
    artist === undefined ||
    songs === undefined ||
    Object.keys(artist).length === 0 ||
    Object.keys(songs).length === 0 ||
    albums === undefined ||
    related_artists === undefined ||
    Object.keys(albums).length === 0 ||
    Object.keys(related_artists).length === 0 ||
    lastfm_artist.lastfm_artist === undefined ||
    Object.keys(lastfm_artist).length === 0
  ) {
    return (
      <Fragment>
        <Spinner />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light btn-sm mb-4">
          Go Home
        </Link>

        {/*START ARTIST JUMBOTRON */}
        <div className="jumbotron jumbo-manual bg-secondary-dark">
          <h1 className="jumbo-header">{artist.artist.artist_name}</h1>
          <p className="heading-underline" />
          <div className="row row-disco">
            <div className="col-disco">
              <strong>
                <i className="fas fa-flag"></i> Country :{" "}
                {checkForContent(artist.artist.artist_country)}
              </strong>
              <br />

              <strong>
                <i className="fas fa-list"></i> Aliases :{" "}
                {artist.artist.artist_alias_list.length === 0
                  ? "NO ALIASES"
                  : artist.artist.artist_alias_list.map(alias => (
                      <li key={Math.random()} data={alias}>
                        {alias.artist_alias}
                      </li>
                    ))}
              </strong>
            </div>
            <div className="col-disco">
              <strong>
                <i className="fas fa-heart"></i> Artist Rating :{" "}
                {checkForContent(artist.artist.artist_rating)}
              </strong>
              <br />
              <strong>
                <i className="fas fa-deaf"></i> Artist Listeners :{" "}
                {checkForContent(lastfm_artist.lastfm_artist.stats.listeners)}
              </strong>
              <br />
              <strong>
                <i className="fas fa-play"></i> Artist Playcount :{" "}
                {checkForContent(lastfm_artist.lastfm_artist.stats.playcount)}
              </strong>
            </div>
            <div className="col-disco">
              <strong>
                <i className="fas fa-dna"></i>
                Artist Tags :{" "}
                {lastfm_artist.lastfm_artist.tags.tag.length === 0
                  ? "NO GENRE AVAILABLE"
                  : lastfm_artist.lastfm_artist.tags.tag.map(genre => (
                      <li key={Math.random()} data={genre}>
                        {genre.name}
                      </li>
                    ))}
              </strong>
            </div>
          </div>
          <div className="row mt-4">
            <a href="#top_songs" className="btn med-btn ">
              Top Songs
            </a>
            <a href="#top_albums" className="btn med-btn ">
              Best Albums
            </a>
            <a href="#related_artists" className="btn med-btn">
              Related Artists
            </a>
          </div>
        </div>
        {/*END ARTIST JUMBOTRON */}

        {/* Start BIO */}
        {lastfm_artist.lastfm_artist.bio.content === "" ? (
          ""
        ) : (
          <div className="wrap-collabsible">
            <input id="collapsible" className="toggle" type="checkbox" />
            <label htmlFor="collapsible" className="lbl-toggle toggle-bio">
              Biography
            </label>

            <div className="collapsible-content">
              <div className="content-inner ">
                {trimNonsenseText(lastfm_artist.lastfm_artist.bio.content)
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
          <h1 className="text-center w-100 bg-light p-4 mb-4" id="top_songs">
            Top 10 Songs
          </h1>
          <div className="row ">
            {songs.songs.length === 0 ? (
              <div className="alert alert-danger ml-3">
                <strong>NO TOP 10 SONGS YET... </strong>
              </div>
            ) : (
              songs.songs.map(item => (
                <Song
                  key={item.track.track_id}
                  song={item.track}
                  loading={loading}
                />
              ))
            )}
          </div>
          <h1 className="text-center w-100 bg-light p-4 mb-4" id="top_albums">
            Album List
          </h1>
          <div className="row">
            {albums.albums.length === 0 ? (
              <div className="alert alert-danger ml-3">
                <strong>NO ALBUMS RELEASED </strong>
              </div>
            ) : (
              albums.albums.map(item => (
                <Album
                  key={item.album.album_id}
                  album={item.album}
                  loading={loading}
                />
              ))
            )}
          </div>
          <h3
            className="text-center w-100 bg-light p-4 mb-4"
            id="related_artists"
          >
            Artists with the same style
          </h3>
          <div className="row">
            {related_artists.related_artists.length === 0 ? (
              <div className="alert alert-danger ml-3">
                <strong>NO RELATED ARTISTS </strong>
              </div>
            ) : (
              related_artists.related_artists.map(item => (
                <Artist
                  key={item.artist.artist_id}
                  artist={item.artist}
                  loading={loading}
                />
              ))
            )}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Discography;
