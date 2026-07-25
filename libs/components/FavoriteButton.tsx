import { Pressable, StyleSheet, Text } from "react-native";
import { useFavoritesStore } from "../stores/useFavoritesStore";

type FavoriteButtonProps = {
  productId: number;
};

export default function FavoriteButton({ productId }: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(productId),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable style={styles.button} onPress={() => toggleFavorite(productId)}>
      <Text style={styles.start}>{isFavorite ? "★" : "☆"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
  },
  start: {
    fontSize: 22,
    color: "#ff0055",
  },
});
