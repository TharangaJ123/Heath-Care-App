import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

export function ExampleComponent() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">UI Components Example</ThemedText>
      
      <TouchableOpacity style={styles.button}>
        <IconSymbol name="house.fill" size={24} color="#007AFF" />
        <ThemedText style={styles.buttonText}>Button with Icon</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
});
