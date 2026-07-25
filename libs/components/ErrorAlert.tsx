import { Pressable, StyleSheet, Text, View } from "react-native";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

type ErrorAlertProps = {
  error: Error;
  refetch: (options?: RefetchOptions) => Promise<unknown>;
};

export default function ErrorAlert({ error, refetch }: ErrorAlertProps) {
  return (
    <View style={styles.centered}>
      <Text style={styles.errorText}>{error.message}</Text>
      <Pressable style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </Pressable>
    </View>
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
  errorText: {
    color: "#ff0000",
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#0000ff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
