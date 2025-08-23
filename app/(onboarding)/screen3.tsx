import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen3() {
  const router = useRouter();

  const handleNext = () => {
    // Navigate to main app
    router.push('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Background Image */}
      <Image
        source={require('../../assets/images/onboarding/o3.png')}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      
      {/* Gradient Overlay */}
      <View style={styles.gradientOverlay} />
      
      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Top Section with Glowing Plus Sign */}
        <View style={styles.topSection}>
          <View style={styles.plusContainer}>
            {/* Main Glowing Plus Sign */}
            <View style={styles.mainPlus}>
              <Text style={styles.plusText}>+</Text>
            </View>
            
            {/* Glow Effect */}
            <View style={styles.plusGlow} />
            
            {/* Digital Texture Dots */}
            <View style={styles.digitalTexture}>
              <View style={[styles.textureDot, styles.dot1]} />
              <View style={[styles.textureDot, styles.dot2]} />
              <View style={[styles.textureDot, styles.dot3]} />
              <View style={[styles.textureDot, styles.dot4]} />
              <View style={[styles.textureDot, styles.dot5]} />
            </View>
            
            {/* Floating Bubbles/Orbs */}
            <View style={[styles.floatingBubble, styles.bubble1]} />
            <View style={[styles.floatingBubble, styles.bubble2]} />
            <View style={[styles.floatingBubble, styles.bubble3]} />
            <View style={[styles.floatingBubble, styles.bubble4]} />
            <View style={[styles.floatingBubble, styles.bubble5]} />
            <View style={[styles.floatingBubble, styles.bubble6]} />
          </View>
        </View>

        {/* Bottom Section with Text and Button */}
        <View style={styles.bottomSection}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              Become{'\n'}a very{'\n'}Fit man!
            </Text>
            
            <Text style={styles.description}>
              Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts.
            </Text>
          </View>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={[styles.progressDot, styles.progressDotInactive]} />
            <View style={styles.progressDot} />
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
  plusContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainPlus: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 50,
    elevation: 25,
    zIndex: 10,
  },
  plusText: {
    fontSize: 60,
    color: '#1E3A8A',
    fontWeight: '900',
  },
  plusGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 80,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 20,
  },
  digitalTexture: {
    position: 'absolute',
    zIndex: 15,
  },
  textureDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  dot1: { top: -20, left: -15, width: 4, height: 4, borderRadius: 2 },
  dot2: { top: -15, right: -20, width: 5, height: 5, borderRadius: 2.5 },
  dot3: { bottom: -25, left: -10, width: 3, height: 3, borderRadius: 1.5 },
  dot4: { bottom: -20, right: -15, width: 4, height: 4, borderRadius: 2 },
  dot5: { top: 10, left: -30, width: 3, height: 3, borderRadius: 1.5 },
  floatingBubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  bubble1: {
    top: -80,
    right: -60,
    width: 40,
    height: 40,
  },
  bubble2: {
    top: -60,
    left: -80,
    width: 30,
    height: 30,
  },
  bubble3: {
    bottom: -70,
    right: -40,
    width: 35,
    height: 35,
  },
  bubble4: {
    bottom: -50,
    left: -60,
    width: 25,
    height: 25,
  },
  bubble5: {
    top: 40,
    right: -90,
    width: 20,
    height: 20,
  },
  bubble6: {
    top: -90,
    right: 20,
    width: 45,
    height: 45,
  },
  bottomSection: {
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 20,
    lineHeight: 48,
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
  doneButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 15,
    marginBottom: 30,
  },
  buttonText: {
    color: '#1E3A8A',
    fontSize: 20,
    fontWeight: '800',
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
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  progressDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowOpacity: 0,
    elevation: 0,
  },
});
