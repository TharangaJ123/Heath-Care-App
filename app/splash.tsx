import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to onboarding after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/(onboarding)');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Background Gradient */}
      <View style={styles.gradientBackground} />
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo Container */}
        <View style={styles.logoContainer}>
          <View style={styles.logoWrapper}>
            <Image
              source={require('../assets/images/onboarding/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          {/* App Name */}
          <Text style={styles.appName}>AppCore</Text>
        </View>
        
        {/* Animated Pulse Effect */}
        <View style={[styles.pulseRing, styles.pulse1]} />
        <View style={[styles.pulseRing, styles.pulse2]} />
        <View style={[styles.pulseRing, styles.pulse3]} />
      </View>
      
      {/* Bottom Caption */}
      <View style={styles.bottomContainer}>
        <Text style={styles.caption}>Empowering Healthier You</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoWrapper: {
    width: 140,
    height: 140,
    backgroundColor: '#F8FAFC',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    zIndex: 10,
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 42,
    fontWeight: '800',
    color: '#1E3A8A',
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: 'rgba(30, 58, 138, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  caption: {
    fontSize: 18,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
    letterSpacing: 1,
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(30, 58, 138, 0.1)',
    borderRadius: 150,
    width: 300,
    height: 300,
  },
  pulse1: {
    opacity: 0.3,
  },
  pulse2: {
    opacity: 0.2,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  pulse3: {
    opacity: 0.1,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
