import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen2() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to next onboarding screen
    router.push('/(onboarding)/screen3');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Background Image */}
      <Image
        source={require('../../assets/images/onboarding/o2.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      
      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />
      
      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Top Section with Abstract Graphic */}
        <View style={styles.topSection}>
          <View style={styles.graphicContainer}>
            {/* Central Light Source */}
            <View style={styles.centralLight}>
              <View style={styles.lightCore} />
              <View style={styles.lightRing} />
            </View>
            
            {/* Scattered Plus Symbols */}
            <View style={[styles.plusSymbol, styles.plus1, styles.plusSolid]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus2, styles.plusOutline]}>
              <Text style={styles.plusTextOutline}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus3, styles.plusSolid]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus4, styles.plusOutline]}>
              <Text style={styles.plusTextOutline}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus5, styles.plusSolid]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus6, styles.plusOutline]}>
              <Text style={styles.plusTextOutline}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus7, styles.plusSolid]}>
              <Text style={styles.plusText}>+</Text>
            </View>
            <View style={[styles.plusSymbol, styles.plus8, styles.plusOutline]}>
              <Text style={styles.plusTextOutline}>+</Text>
            </View>
          </View>
        </View>

        {/* Bottom Section with Text and Button */}
        <View style={styles.bottomSection}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Smooth Design{'\n'}Experience
            </Text>
            
            <Text style={styles.description}>
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
          
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={styles.progressDot} />
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
  graphicContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralLight: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightCore: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    elevation: 20,
  },
  lightRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 60,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
  plusSymbol: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 8,
  },
  plusSolid: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  plusOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 20,
  },
  plusText: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: 'bold',
  },
  plusTextOutline: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  plus1: {
    top: -60,
    right: -40,
    width: 32,
    height: 32,
  },
  plus2: {
    top: -40,
    left: -60,
    width: 28,
    height: 28,
  },
  plus3: {
    bottom: -50,
    right: -30,
    width: 36,
    height: 36,
  },
  plus4: {
    bottom: -30,
    left: -50,
    width: 24,
    height: 24,
  },
  plus5: {
    top: 20,
    right: -70,
    width: 20,
    height: 20,
  },
  plus6: {
    top: -70,
    right: 20,
    width: 32,
    height: 32,
  },
  plus7: {
    bottom: 20,
    left: -70,
    width: 28,
    height: 28,
  },
  plus8: {
    top: 60,
    left: -30,
    width: 24,
    height: 24,
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
    textAlign: 'left',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 18,
    color: '#E2E8F0',
    lineHeight: 26,
    textAlign: 'left',
    opacity: 0.95,
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
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
