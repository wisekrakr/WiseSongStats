import React, { Fragment } from "react";
import Songs from "../songs/Songs";

const Index = () => {
  return (
    <Fragment>
      <div className="jumbotron jumbo-index" id="top">
        <h1 className="text-center large-heading">The Search for Music</h1>
        <p className="lead text-center">Get info on any song or artist</p>

        <ul className="nav justify-content-center flex-row p-2 w-100 bg-light">
          <li className="nav-item">
            <a className="nav-link" href="#top_songs">
              <h4>Top 10 Songs</h4>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#top_artists">
              <h4>Top 10 Artists</h4>
            </a>
          </li>
        </ul>
      </div>
      <Songs />
    </Fragment>
  );
};

export default Index;
