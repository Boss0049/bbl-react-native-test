import { create } from "zustand";

type FavoritesStore = {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favoriteIds: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    })),
}));
