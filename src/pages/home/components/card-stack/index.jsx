import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { useRequest } from "ahooks";

import Box from "@mui/material/Box";

import { archiveCardById, fetchCollectionsUsingGet, saveCardById } from "services/cards";

import ArticleCard from "components/article-card";

export default function CardStack({
  cards,
  removeCard
}) {
  const navigate = useNavigate();
  const [collections, setCollections] = useState([]);

  const { run: getCollections } = useRequest(fetchCollectionsUsingGet, {
    manual: true,
    onSuccess: (response) => {
      setCollections(response.collections);
    },
    onError: (e) => {
      console.error(e);
    }
  });

  const { run: saveCard } = useRequest(saveCardById, {
    manual: true,
    onSuccess: (response) => {
      // removeCard(cardId);
    },
    onError: (e) => {
      console.error(e);
    }
  });

  const { run: archiveCard } = useRequest(archiveCardById, {
    manual: true,
    onSuccess: (response) => {
      // setArchived(true);
    },
    onError: (e) => {
      console.error(e);
    }
  });

  useEffect(() => {
    getCollections();
  }, [getCollections]);


  const handleArchiveClick = (cardId) => {
    archiveCard(cardId);
  }

  const handleSave = (cardId, collectionId) => {
    saveCard(cardId, collectionId);
  }


  const handleSwipeLeft = (card) => {
    removeCard(card.id);
  };

  const handleSwipeRight = (card) => {
    removeCard(card.id);
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
          onSwipeLeft={() => handleSwipeLeft(card)}
          onSwipeRight={() => handleSwipeRight(card)}
          onClick={() => handleOnClick(card.id)}
          collections={collections}
          handleSave={(collectionId) => handleSave(card.id, collectionId)}
          handleArchiveClick={() => handleArchiveClick(card.id)}
        />
      ))}
    </Box>
  );
}
