import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexAuth = () => {
  return (
    <SafeAreaView>
      <Button title="Login" onPress={() => router.push("/auth/sign-in")} />
      <Button title="Register" onPress={() => router.push("/auth/sign-up")} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default IndexAuth;
