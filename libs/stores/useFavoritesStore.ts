import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEY } from "../constants/asyncStorage";

type FavoritesStore = {
  favoriteIds: number[];
  loadFavorites: () => Promise<void>;
  toggleFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesStore>((set) => ({
  favoriteIds: [],
  loadFavorites: async () => {
    try {
      const data = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.FAVORITES);
      if (data) {
        set({
          favoriteIds: JSON.parse(data),
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
  toggleFavorite: async (id) => {
    let updated: number[] = [];

    set((state) => {
      updated = state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id];
      return {
        favoriteIds: updated,
      };
    });
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY.FAVORITES,
      JSON.stringify(updated),
    );
  },
}));
