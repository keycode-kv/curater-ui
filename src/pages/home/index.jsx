import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MainHeader from "components/main-header";

import CardStack from "./components/card-stack";
import EmptyStack from "./components/empty-stack";

import { useCardsStore } from "stores/cards";

const useStyles = makeStyles({
  container: {
    height: `calc(100vh - 80px)`,
    display: "flex",
    flexGrow: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Home = () => {
  const classes = useStyles();
  const cards = useCardsStore((state) => state.cards);
  const showEmptyWidget = !cards?.length;
  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <MainHeader />
      <div className={classes.container}>
        {showEmptyWidget ? (
          <Box sx={{ p: "12px" }}>
            <EmptyStack />
          </Box>
        ) : (
          <CardStack cards={cards} />
        )}
      </div>
    </Box>
  );
};

export default Home;
