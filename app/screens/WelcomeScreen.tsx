import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type WelcomeScreenProps = Record<string, never>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../../assets/images/market.jpg')} // Use a city/market/cafe image if available
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            {/* Simple vector icon (location pin) using SVG */}
            <View style={styles.iconCircle}>
              <View style={styles.pinBase} />
              <View style={styles.pinDot} />
            </View>
            <Text style={styles.appName}>Lokolo</Text>
          </View>
          <Text style={styles.tagline}>Discover what&apos;s around you.</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.getStartedButton} activeOpacity={0.85}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} activeOpacity={0.85}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pinBase: {
    width: 18,
    height: 28,
    borderRadius: 9,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 10,
    left: 23,
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ECDC4',
    position: 'absolute',
    top: 22,
    left: 27,
    borderWidth: 2,
    borderColor: '#fff',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 48,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  getStartedButton: {
    width: '100%',
    backgroundColor: '#4ECDC4',
    paddingVertical: 18,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#4ECDC4',
    paddingVertical: 16,
    borderRadius: 32,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loginText: {
    color: '#4ECDC4',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default WelcomeScreen;