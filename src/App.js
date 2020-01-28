import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/layouts/Header";
import Index from "./components/layouts/Index";
import Lyrics from "./components/songs/Lyrics";
import AlbumInfo from "./components/albums/AlbumInfo";
import Discography from "./components/artists/Discography";
import Countries from "./components/countries/Countries";
import CountryChart from "./components/countries/CountryChart";
import ScrollToTop from "./components/activities/ScrollToTop";

import { ContextController } from "./context"; //curly braces because it is not a default export

import "./App.css";
import "./bootstrap.min.css";
import "./js/main";

export default function App() {
  return (
    <ContextController>
      <Router>
        <Fragment>
          <ScrollToTop />
          <Header />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={Index} />

            <Route exact path="/lyrics/song/:id" component={Lyrics} />
            <Route
              exact
              path="/discography/artist/:id"
              component={Discography}
            />
            <Route
              exact
              path="/discography/artist/album/:id"
              component={AlbumInfo}
            />
            <Route exact path="/countries" component={Countries} />

            <Route
              exact
              path="/countries/country/:id"
              component={CountryChart}
            />
          </Switch>
        </Fragment>
      </Router>
    </ContextController>
  );
}
