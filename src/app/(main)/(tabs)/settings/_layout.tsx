import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const SettingsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default SettingsLayout;
