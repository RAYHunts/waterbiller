import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useAuthStore from "@/store/authStore";
import React from "react";
import { Button, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useThemeStore } from "@/store/themeStore";
import { router } from "expo-router";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";

const Settings = () => {
  const backgroundColor = useThemeColor({}, "background");
  const { session, logout } = useAuthStore();
  const textColor = useThemeColor({}, "text");
  const { setPreferredTheme } = useThemeStore();
  return (
    <SafeAreaView>
      <ThemedView>
        <View style={styles.container}>
          <View style={{ display: "flex", flexDirection: "row", gap: 16, alignItems: "center", justifyContent: "flex-start" }}>
            <Image source={"https://picsum.photos/100"} style={styles.avatar} />
            <View>
              <ThemedText>{session?.user?.user_metadata.first_name + " " + session?.user.user_metadata.last_name}</ThemedText>
              <ThemedText>{session?.user?.email}</ThemedText>
            </View>
          </View>
          <View>
            <View style={styles.menuGroup}>
              <Pressable onPress={() => router.push("/settings/profile")} style={styles.menu}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Ionicons name="person" size={20} style={{ color: textColor }} />
                  <ThemedText>Profile</ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={10} style={{ color: textColor }} />
              </Pressable>
              <Pressable onPress={() => router.push("/settings/meter-device")} style={styles.menu}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Ionicons name="speedometer" size={20} style={{ color: textColor }} />
                  <ThemedText>Meter Devices</ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={10} style={{ color: textColor }} />
              </Pressable>
              <Pressable onPress={() => router.push("/settings/meter-device")} style={styles.menu}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <FontAwesome6 name="gear" size={20} style={{ color: textColor }} />
                  <ThemedText>Preferences</ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={10} style={{ color: textColor }} />
              </Pressable>
            </View>
            <View style={styles.menuGroup}>
              <Pressable onPress={logout} style={styles.menu}>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Ionicons name="log-out" size={20} style={{ color: textColor }} />
                  <ThemedText>Logout</ThemedText>
                </View>
                <FontAwesome6 name="chevron-right" size={10} style={{ color: textColor }} />
              </Pressable>
            </View>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  menuGroup: {
    padding: 16,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  menu: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Settings;
