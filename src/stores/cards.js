import { create } from "zustand";

const useCardsStore = create((set) => ({
    cards: [
      {
        "id": "id_123",
        "title": "heading",
        "content": "gist of the newsletter",
        "rating": 3.55,
        "view_count": 1432,
        "source_email": "joobi@test.com",
        "tags": ["golang", "backend", "programming"],
        "comments_count": 1562
      },
      {
        "id": "id_1444",
        "title": "heading",
        "content": "gist of the newsletter",
        "rating": 3.55,
        "view_count": 1432,
        "source_email": "joobi@test.com",
        "tags": ["golang", "backend", "programming"],
        "comments_count": 1562
      },
    ],
    setUser: (newUserData) => set(() => ({ user: newUserData })),
    removeCard: (cardId) => set((state) => {
        console.log({
            cardId,
            state
        })
        return ({ ...state, cards: state.cards.filter((card) => card.id !== cardId) })
    })
}));

export { useCardsStore }
