import { create } from "zustand";

const useCardsStore = create((set) => ({
    cards: [],
    removeCard: (cardId) => set((state) => ({
      ...state,
      cards: state.cards.filter((card) => card.id !== cardId)
    }))
}));

export { useCardsStore }
