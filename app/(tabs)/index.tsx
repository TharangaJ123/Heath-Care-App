import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function TabOneScreen() {
  const router = useRouter();
  
  const navigateToProfile = () => {
    router.setParams({ screen: 'profile' });
  };

  const navigateToSettings = () => {
    router.setParams({ screen: 'settings' });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Home Tab</ThemedText>
      <ThemedText style={styles.subtitle}>
        This is the first tab screen
      </ThemedText>
      
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={navigateToProfile}>
          <ThemedText style={styles.buttonText}>Go to Profile Tab</ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={navigateToSettings}>
          <ThemedText style={styles.buttonText}>Go to Settings Tab</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
