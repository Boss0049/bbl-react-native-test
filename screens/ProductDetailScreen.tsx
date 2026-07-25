import { RootStackParamList } from "@/App";
import ErrorAlert from "@/libs/components/ErrorAlert";
import FavoriteButton from "@/libs/components/FavoriteButton";
import Loading from "@/libs/components/Loading";
import { useProduct } from "@/libs/hooks/useProduct";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function ProductDetailScreen() {
  const { params } = useRoute<RouteProp<RootStackParamList, "ProductDetail">>();
  const { data, isPending, isError, error, refetch } = useProduct(params.id);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorAlert error={error} refetch={() => refetch()} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Image
        source={{ uri: data.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.price}>${data.price.toFixed(2)}</Text>
      <Text style={styles.category}>{data.category}</Text>
      <Text style={styles.rating}>
        ★ {data.rating.rate} ({data.rating.count} reviews)
      </Text>
      <Text style={styles.description}>{data.description}</Text>
      <FavoriteButton productId={Number(params.id)} isShowText />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 16,
  },
  content: {
    padding: 16,
    gap: 8,
  },
  image: {
    width: "100%",
    height: 240,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  price: {
    fontSize: 20,
    color: "#0000ff",
    fontWeight: "700",
  },
  category: {
    fontSize: 13,
    color: "#666",
    textTransform: "capitalize",
  },
  rating: {
    fontSize: 14,
    color: "#444",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    marginTop: 8,
  },
});

export default ProductDetailScreen;
