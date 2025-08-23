import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to next onboarding screen
    router.push('/(onboarding)/screen2');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Background Image */}
      <Image
        source={require('../../assets/images/onboarding/o1.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      
      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />
      
      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Top Section with Heart Icon */}
        <View style={styles.topSection}>
          <View style={styles.heartContainer}>
            <View style={styles.heartIcon}>
              <Text style={styles.heartText}>♥</Text>
            </View>
            
            {/* Floating Plus Icons */}
            <View style={[styles.floatingIcon, styles.plus1]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.floatingIcon, styles.plus2]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.floatingIcon, styles.plus3]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.floatingIcon, styles.plus4]}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </View>
        </View>

        {/* Bottom Section with Text and Button */}
        <View style={styles.bottomSection}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Track your{'\n'}Health
            </Text>
            
            <Text style={styles.description}>
              Monitor your wellness journey with our comprehensive health tracking app. Stay informed, stay healthy.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
            <Text style={styles.buttonIcon}>→</Text>
          </TouchableOpacity>
          
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={[styles.progressDot, styles.progressDotInactive]} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    paddingTop: 50, // Safe area for status bar
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 58, 138, 0.85)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: height * 0.1,
    paddingBottom: height * 0.08,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 140,
    height: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
  heartText: {
    fontSize: 60,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  floatingIcon: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  plusText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  plus1: {
    top: -30,
    right: -25,
    width: 32,
    height: 32,
  },
  plus2: {
    bottom: -35,
    left: -30,
    width: 40,
    height: 40,
  },
  plus3: {
    top: 25,
    left: -45,
    width: 28,
    height: 28,
  },
  plus4: {
    top: -45,
    right: 45,
    width: 36,
    height: 36,
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 18,
    color: '#E2E8F0',
    lineHeight: 26,
    textAlign: 'center',
    opacity: 0.95,
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 30,
  },
  buttonText: {
    color: '#1E3A8A',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
    color: '#1E3A8A',
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 5,
  },
  progressDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowOpacity: 0,
    elevation: 0,
  },
});
