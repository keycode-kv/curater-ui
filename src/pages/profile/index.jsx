import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MainHeader from "../../components/main-header";

const useStyles = makeStyles({
  container: {
    background:
      "var(--BG-Gradient, conic-gradient(from 270deg at 88.19% -14.65%, #FFF 0deg, #D39CFF 0.035999999090563506deg, #070707 360deg))",
      maxHeight: "100vh",
      minHeight: '100vh',
    width: "100%",
    color: "white",
  },
});

const ProfilePage = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.container}>
      <MainHeader />
      Profile Page
    </Grid>
  );
};

export default ProfilePage;
