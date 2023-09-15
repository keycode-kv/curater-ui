import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid } from "@mui/material";

const useStyles = makeStyles({
  headerWrapper: {
    height: "40px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    border: "1px solid white",
    color: "white",
    justifyContent: "center",
  },
});

const MainHeader = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.headerWrapper}>
      Curater
    </Grid>
  );
};

export default MainHeader;
