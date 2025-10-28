import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SPLASH_DURATION = 2000; 

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, SPLASH_DURATION);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/copy.png')} 
        style={styles.logo} 
      />
      <Text style={styles.appName}>Libreria</Text>
      <Text style={styles.appSubtitle}>Salta</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A1B9A', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#E0E0E0',
    letterSpacing: 1,
    marginTop: 5,
  },
});

export default SplashScreen;