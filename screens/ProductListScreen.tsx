import { RootStackParamList } from "@/App";
import ErrorAlert from "@/libs/components/ErrorAlert";
import Loading from "@/libs/components/Loading";
import ProductCard from "@/libs/components/ProductCard";
import { PRODUCT_DETAIL } from "@/libs/constants/screen";
import { useProductList } from "@/libs/hooks/useProduct";
import { useFavoritesStore } from "@/libs/stores/useFavoritesStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

function ProductListScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [search, setSearch] = useState("");
  const { data, isPending, isError, error, refetch, isRefetching } =
    useProductList();

  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorAlert error={error} refetch={() => refetch()} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found.</Text>
      </View>
    );
  }

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search products"
        value={search}
        onChangeText={setSearch}
        accessibilityLabel="Search products"
        clearButtonMode="while-editing"
      />
      {filteredData.length === 0 ? (
        <View style={styles.centered}>
          <Text>No results for "{search}".</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate(PRODUCT_DETAIL, { id: String(item.id) })
              }
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    margin: 12,
    marginBottom: 0,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
  },
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

export default ProductListScreen;
