import React, { useState, useEffect } from "react";
import axios from "axios";

// Context provides a way to pass data through
// the component tree without having to pass props down manually at every level.
export const Context = React.createContext();

export function ContextController({ children }) {
  let intialState = {
    song_list: [],
    artist_list: [],
    heading: ""
  };

  const [state, setState] = useState(intialState);

  // Shows a list of top US artists and songs on Homepage

  // TODO NOT A LIMIT OF 10. TIME FOR PAGINATION!!!!! =>>>> CONTAINER OR CAROUSEL TO PUT OUT PAGES IN. MULTIPLE PAGETURNERS ON ONE PAGE
  useEffect(() => {
    axios
      .all([
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}chart.tracks.get?
          chart_name=top&
          country=us&
          apikey=${process.env.REACT_APP_API_KEY}`
        ),
        axios.get(
          `${process.env.REACT_APP_SONGS_URL}chart.artists.get?
          &page_size=20&page=1&
          apikey=${process.env.REACT_APP_API_KEY}`
        )
      ])
      .then(
        axios.spread((songs, artists) => {
          setState({
            song_list: songs.data.message.body.track_list,
            artist_list: artists.data.message.body.artist_list,
            heading:
              songs === undefined ||
              songs.length === 0 ||
              artists === undefined ||
              artists.length === 0
                ? {
                    songs: "Top 10 Songs Searched",
                    artists: "Top 10 Artists Searched"
                  }
                : {
                    songs: "Most Searched Songs",
                    artists: "Most Searched Artists"
                  }
          });
        })
      )
      .catch(err => {
        console.log(err);
      });
  }, []);

  // We will import this from the Component so that we can access data in the Context.Provider
  // {value => /* render something based on the context value */}
  // This is similar to what mapStateToProps does
  // The Provider will wrap around every other Component, so that we can access
  // any state that we put in this provider, we will be able to access through any other
  // Component as long as we use a Consumer
  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}
