import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useAuthStore from "@/store/authStore";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { updateUser } from "@/queries/users";

const Profile = () => {
  const { session, logout } = useAuthStore();

  return (
    <SafeAreaView>
      <ThemedView>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image source={session?.user.user_metadata.avatar_url} style={styles.avatar} />
            <ThemedText>{session?.user?.user_metadata.first_name}</ThemedText>
            <ThemedText>{session?.user?.email}</ThemedText>
          </View>
          <View>
            <ThemedText>Profile</ThemedText>
            <ThemedText>{session?.user?.email}</ThemedText>
            <ThemedText>{session?.user?.user_metadata.first_name + " " + session?.user.user_metadata.last_name}</ThemedText>
            <Button title="Update" />
            <Button title="Logout" onPress={logout} />
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
});

export default Profile;
