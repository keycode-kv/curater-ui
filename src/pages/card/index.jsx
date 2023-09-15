import React from "react";
import { makeStyles } from '@mui/styles';
import { Grid } from "@mui/material";

const useStyles = makeStyles({
 container: {
  display: "flex",
  background: "red",
  color: "yellow",
  height: "100vh",
  width: '100%'
 }
});

const Home = () => {
  const classes = useStyles();
  return (
    <Grid item className={classes.container} xs={12} md={6} lg={4}>
        Content Here
    </Grid>
  );
};

export default Home;
