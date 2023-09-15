import React, { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import MainHeader from "components/main-header";

import CardStack from "./components/card-stack";
import EmptyStack from "./components/empty-stack";


import { fetchCardsListUsingGet } from "services/cards";

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
  const [cards, setCards] = useState([]);

  const removeCard = (cardId) => {
    const filteredCards = cards?.filter((card) => card?.id !== cardId )
    setCards(filteredCards);
    if (!filteredCards?.length) {
      fetchCards({});
    }
  }


  const { run: fetchCards } = useRequest(fetchCardsListUsingGet, {
    manual: true,
    onSuccess: (response) => {
      setCards(response?.cards ?? []);
    },
    onError: (e) => {
      console.error(e);
    }
  });

  useEffect(() => {
    fetchCards({});
  }, []);


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
          <CardStack
            cards={cards}
            removeCard={removeCard}
          />
        )}
      </div>
    </Box>
  );
};

export default Home;
