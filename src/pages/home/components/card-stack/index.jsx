import React from "react";

import Box from "@mui/material/Box";

import { useCardsStore } from "stores/cards";

import ArticleCard from "components/article-card";

export default function CardStack({ cards }) {
  const removeCard = useCardsStore((state) => state.removeCard);

  const swiped = (cardId) => {
    removeCard(cardId);
  };

  const handleSwipeLeft = (cardId) => {
    // TODO: ADD swipe left action
    console.log("Swiped left");
    swiped(cardId);
  };

  const handleSwipeRight = (cardId) => {
    // TODO: ADD swipe right action
    console.log("Swiped right");
    swiped(cardId);
  };

  const handleOnClick = (cardId) => {
    // TODO: ADD onClick action
    console.log("Clicked");
  };

  return (
    <Box sx={{ position: "relative" }}>
      {cards?.map((card, index) => (
        <ArticleCard
          index={index}
          key={card.id}
          card={card}
          onSwipeLeft={() => handleSwipeLeft(card.id)}
          onSwipeRight={() => handleSwipeRight(card.id)}
          onClick={() => handleOnClick(card.id)}
        />
      ))}
    </Box>
  );
}
