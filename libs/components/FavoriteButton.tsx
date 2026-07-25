import { Pressable, StyleSheet, Text } from "react-native";
import { useFavoritesStore } from "../stores/useFavoritesStore";

type FavoriteButtonProps = {
  productId: number;
  isShowText?: boolean;
};

export default function FavoriteButton({
  productId,
  isShowText = false,
}: FavoriteButtonProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(productId),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable style={styles.button} onPress={() => toggleFavorite(productId)}>
      {isShowText && (
        <Text style={[styles.title, isFavorite ? styles.favoriteColor : {}]}>
          Favorite
        </Text>
      )}
      <Text style={[styles.start, isFavorite ? styles.favoriteColor : {}]}>
        {isFavorite ? "★" : "☆"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  start: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
  },
  favoriteColor: {
    color: "#ff0055",
  },
});
