import React from "react";
import { Box } from "@mui/material";

import CardStack from "./components/card-stack";
import EmptyStack from "./components/empty-stack";

import { useCardsStore } from "stores/cards";

const Home = () => {
  const cards = useCardsStore((state) => state.cards);
  const showEmptyWidget = !cards?.length
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexGrow: '1',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {showEmptyWidget
        ? <EmptyStack />
        : <CardStack cards={cards} />
      }      
    </Box>
  );
};

export default Home;