import React from "react";

import { useNavigate } from "react-router";

import Box from "@mui/material/Box";

import { useCardsStore } from "stores/cards";

import ArticleCard from "components/article-card";

export default function CardStack({ cards }) {
  const navigate = useNavigate();
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
    navigate(`/card/${cardId}`);
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
