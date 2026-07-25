import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { RootStackParamList } from "@/App";

import ProductCard from "@/libs/components/ProductCard";
import ErrorAlert from "@/libs/components/ErrorAlert";

import { useProductList } from "@/libs/hooks/useProduct";
import { useFavoritesStore } from "@/libs/stores/useFavoritesStore";
import { PRODUCT_DETAIL } from "@/libs/constants/screen";

export default function FavoritesScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, isPending, isError, error, refetch } = useProductList();
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  if (isPending) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    return <ErrorAlert error={error} refetch={() => refetch()} />;
  }

  const favoriteProducts = data.filter((product) =>
    favoriteIds.includes(product.id),
  );

  if (favoriteProducts.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favoriteProducts}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate(PRODUCT_DETAIL, { id: String(item.id) })
          }
        />
      )}
    />
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
  list: {
    padding: 12,
  },
});
