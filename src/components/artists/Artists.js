import React, { useContext, Fragment } from "react";
import { Context } from "../../context";
import Spinner from "../layouts/Spinner";
import Artist from "./Artist";

const Artists = () => {
  const [state] = useContext(Context);
  const { artist_list, heading } = state;

  if (artist_list === undefined || artist_list.length === 0) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <h3 className="text-center mb-4">{heading} </h3>
        <div className="row">
          {artist_list.map(item => (
            <Artist key={item.artist.artist_id} artist={item.artist} />
          ))}
        </div>
      </Fragment>
    );
  }
};

export default Artists;
