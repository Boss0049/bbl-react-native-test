import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  FAVORITES,
  PRODUCT_DETAIL,
  PRODUCT_LIST,
} from "@/libs/constants/screen";
import FavoritesScreen from "@/screens/FavoritesScreen";
import ProductDetailScreen from "@/screens/ProductDetailScreen";
import ProductListScreen from "@/screens/ProductListScreen";
import { Pressable, Text } from "react-native";

export type RootStackParamList = {
  [PRODUCT_LIST]: undefined;
  [PRODUCT_DETAIL]: { id: string };
  [FAVORITES]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={PRODUCT_LIST}
            component={ProductListScreen}
            options={({ navigation }) => ({
              title: "Products",
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate(FAVORITES)}>
                  <Text>★ Favorites</Text>
                </Pressable>
              ),
            })}
          />
          <Stack.Screen
            name={PRODUCT_DETAIL}
            component={ProductDetailScreen}
            options={{ title: "Products Detail" }}
          />
          <Stack.Screen
            name={FAVORITES}
            component={FavoritesScreen}
            options={{ title: "Favorites" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
