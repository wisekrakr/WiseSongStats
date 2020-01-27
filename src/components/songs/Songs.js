import React, { useContext, Fragment } from "react";
import { Context } from "../../context";
import Spinner from "../layouts/Spinner";
import Song from "./Song";
import Artist from "../artists/Artist";

const Songs = () => {
  const [state] = useContext(Context);
  const { song_list, artist_list, heading } = state;

  if (
    song_list === undefined ||
    song_list.length === 0 ||
    artist_list === undefined ||
    artist_list.length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div className="container">
          <h3 className="text-center text-xl">{heading.songs} </h3>
          <div className="row" id="top_songs">
            {song_list.map(item => (
              <Song key={item.track.track_id} song={item.track} />
            ))}
          </div>
          <h3 className="text-center text-xl">{heading.artists}</h3>
          <div className="row" id="top_artists">
            {artist_list.map(item => (
              <Artist key={item.artist.artist_id} artist={item.artist} />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Songs;
