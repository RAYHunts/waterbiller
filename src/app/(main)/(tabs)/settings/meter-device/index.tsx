import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Index = () => {
  return (
    <View>
      <Text>Meter Device</Text>

      <Pressable
        onPress={() => {
          console.log('Pressed');
        }}
        style={styles.requestButton}>
        <ThemedText>Request Meter Device</ThemedText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  requestButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
});

export default Index;
