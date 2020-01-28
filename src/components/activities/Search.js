import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context";

const Search = props => {
  const [setState] = useContext(Context);
  const [user_input, setUserInput] = useState("");
  const [song_title, setSongTitle] = useState("");
  const [artist_name, setArtistName] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}track.search?
          q_track=${song_title}&
          ${process.env.REACT_APP_TOP_TEN}&page=1&
          s_track_rating=desc&
          apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}artist.search?
          q_artist=${artist_name}&
          ${process.env.REACT_APP_TOP_TEN}&page=1&
          apikey=${process.env.REACT_APP_API_KEY}`
        )
      ])
      .then(res => {
        let song_list = res[0].data.message.body.track_list;
        let artist_list = res[1].data.message.body.artist_list;

        setState({
          song_list: song_list,
          artist_list: artist_list,

          heading:
            user_input === ""
              ? {
                  songs: "Top 10 Songs Searched",
                  artists: "Top 10 Artists Searched"
                }
              : {
                  songs: `Search Results for Songs with: ${user_input}`,
                  artists: `Search Results for Artist: ${user_input}`
                }
        });
      })
      .catch(err => console.log(err));
  }, [song_title, artist_name, user_input, setState]); // Only re-run the effect if params changes

  const findMusic = event => {
    event.preventDefault();
    setSongTitle(user_input);
    setArtistName(user_input);
  };

  const searchValue = event => {
    setUserInput(event.target.value);
  };

  const backToHomePage = () => {
    let path = `/`;
    props.history.push(path);
  };

  return (
    <form onSubmit={findMusic} className="form-inline my-2 my-lg-0">
      <input
        type="text"
        className="form-control mr-sm-2"
        placeholder="Search for any artist or song..."
        name="user_input"
        value={user_input}
        onChange={searchValue}
      />
      <button
        onClick={backToHomePage}
        className="btn btn-dark my-2 my-sm-0"
        type="Submit"
      >
        Search
      </button>
    </form>
  );
};

export default withRouter(Search);
