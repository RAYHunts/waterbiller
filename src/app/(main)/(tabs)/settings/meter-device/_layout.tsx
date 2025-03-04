import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

const MeterLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[uuid]" />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default MeterLayout;
