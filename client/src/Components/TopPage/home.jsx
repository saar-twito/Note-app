// * Import
import React from "react";

// * Style
import classes from "./home.module.css";

const home = () => {
  return (
    <div className={classes.Top}>
      <div className={classes.Image}></div>
      <h1 className={classes.Header}>
        Welcome,
        <br /> To the Note App
      </h1>
    </div>
  );
};

export default home;
