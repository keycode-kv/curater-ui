import { create } from "zustand";

const useCardsStore = create((set) => ({
    cards: [
      {
        "id": "id_123",
        "title": "heading1",
        "content": "gist of the newsletter 1",
        "rating": 3.55,
        "view_count": 1432,
        "source_email": "joobi@test1.com",
        "tags": ["golang", "backend", "programming"],
        "comments_count": 1562
      },
      {
        "id": "id_1444",
        "title": "heading2",
        "content": "gist of the newsletter 2",
        "rating": 3.55,
        "view_count": 1432,
        "source_email": "joobi@test2.com",
        "tags": ["golang", "backend", "programming"],
        "comments_count": 1562
      },
    ],
    setUser: (newUserData) => set(() => ({ user: newUserData })),
    removeCard: (cardId) => set((state) => ({
      ...state,
      cards: state.cards.filter((card) => card.id !== cardId)
    }))
}));

export { useCardsStore }
