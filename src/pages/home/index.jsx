import React from "react";
import { makeStyles } from '@mui/styles';
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";

// const useStyles = makeStyles({
//  container: {
//   display: "flex",
//   background: "red",
//   color: "yellow",
//   height: "100vh",
//   width: '100%'
//  }
// });

const Home = () => {
    const navigate = useNavigate()
//   const classes = useStyles();
  return (
    <Grid item xs={12} md={6} lg={4}>
        <Button
          onClick={() => navigate('/card')}
        >
            Goto Cards
        </Button>
    </Grid>
  );
};

export default Home;