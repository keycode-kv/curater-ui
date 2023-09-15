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
    flexDirection: "column",
    alignItems: "center",
    padding: '28px 20px'
  },
});

const Home = () => {
  const classes = useStyles();
  const [cards, setCards] = useState([]);

  const removeCard = (cardId) => {
    const filteredCards = cards?.filter((card) => card?.id !== cardId);
    setCards(filteredCards);
    if (!filteredCards?.length) {
      fetchCards({ type: "active" });
    }
  };

  const { run: fetchCards } = useRequest(fetchCardsListUsingGet, {
    manual: true,
    onSuccess: (response) => {
      setCards(response?.cards ?? []);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  useEffect(() => {
    fetchCards({ type: "active" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showEmptyWidget = !cards?.length;

  return (
    <Box
      sx={{
        height: "100vh",
      }}
    >
      <MainHeader isFilterVisible={false} />
      <div className={classes.container}>
        {showEmptyWidget ? (
          <EmptyStack />
        ) : (
          <CardStack cards={cards} removeCard={removeCard} />
        )}
      </div>
    </Box>
  );
};

export default Home;
