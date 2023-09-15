import React from 'react';

import { useCardsStore } from 'stores/cards';

import ArticleCard from '../article-card';

export default function CardStack({ cards }) {
  const removeCard = useCardsStore((state) => state.removeCard);
 

  const swiped = (cardId) => {
    removeCard(cardId)
  }

  const handleSwipeLeft = (cardId) => {
    // TODO: ADD swipe left action
    console.log('Swipped left');
    swiped(cardId);
  }

  const handleSwipeRight = (cardId) => {
    // TODO: ADD swipe right action
    console.log('Swipped right');
    swiped(cardId);
  }

  return (
    <>
     {cards?.map((card) =>
        <ArticleCard
          key={card.id}
          card={card}
          onSwipeLeft={() => handleSwipeLeft(card.id)}
          onSwipeRight={() => handleSwipeRight(card.id)}
        />
     )}
    </>
  )
};

