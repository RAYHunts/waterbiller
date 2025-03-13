import { StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "@/store/authStore";

export default function HomeScreen() {
  const { session } = useAuthStore();
  return (
    <SafeAreaView>
      <ThemedView>
        <View style={styles.container}>
          <View style={styles.card}>
            <ThemedText>Home</ThemedText>
            <ThemedText>Home is where the heart is.</ThemedText>
          </View>
          <View style={styles.gridContainer}>
            <View style={[styles.card, styles.cardHalf]}>
              <ThemedText>Hello {session?.user?.user_metadata.first_name}!</ThemedText>
            </View>

            <View style={[styles.card, styles.cardHalf]}>
              <ThemedText>Home</ThemedText>
              <ThemedText>Home is where the heart is.</ThemedText>
            </View>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  card: {
    backgroundColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  cardHalf: {
    width: "50%",
  },
  gridContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
