import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Product } from "../types";
import FavoriteButton from "./FavoriteButton";

type ProductCardProps = {
  product: Product;
  onPress: () => void;
};

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image
        source={{ uri: product.image }}
        style={styles.thumbnail}
        resizeMode="contain"
      />
      <View style={styles.rowText}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <FavoriteButton productId={product.id} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
  },
  thumbnail: {
    width: 56,
    height: 56,
  },
  rowText: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  price: {
    fontSize: 14,
    color: "#444",
  },
});
