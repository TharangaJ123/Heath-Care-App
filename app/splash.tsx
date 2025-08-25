import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to onboarding after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/(onboarding)');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Background Gradient */}
      <View style={styles.gradientBackground} />
      
      {/* Logo Container */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/images/onboarding/logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>
        
        {/* Animated Pulse Effect */}
        <View style={[styles.pulseRing, styles.pulse1]} />
        <View style={[styles.pulseRing, styles.pulse2]} />
        <View style={[styles.pulseRing, styles.pulse3]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1E3A8A',
    opacity: 0.95,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoWrapper: {
    width: 180,
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 10,
  },
  logo: {
    width: 120,
    height: 120,
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 150,
    width: 300,
    height: 300,
  },
  pulse1: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: 'pulse',
    opacity: 0.6,
  },
  pulse2: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: 'pulse',
    animationDelay: '0.5s',
    opacity: 0.4,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  pulse3: {
    animationDuration: '2s',
    animationIterationCount: 'infinite',
    animationName: 'pulse',
    animationDelay: '1s',
    opacity: 0.2,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
