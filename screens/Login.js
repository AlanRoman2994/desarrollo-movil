import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from '../src/config/firebaseConfig';
import { COLORS, loginStyle as styles } from '../src/config/styles';
import bg from "../assets/bg.png";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Validación de email
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Validación de contraseña (mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número, 1 símbolo)
  const validatePassword = (password) =>
   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)

  // Validación en tiempo real
  useEffect(() => {
    if (email.length === 0) {
      setEmailError('');
    } else if (!validateEmail(email)) {
      setEmailError('Correo inválido');
    } else {
      setEmailError('');
    }

    if (password.length === 0) {
      setPasswordError('');
    } else if (!validatePassword(password)) {
      setPasswordError('Credencial inválida, revise correo y contraseña');
    } else {
      setPasswordError('');
    }

    // Habilitar el botón solo si ambos son válidos
    setIsButtonDisabled(!validateEmail(email) || !validatePassword(password));
  }, [email, password]);

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userId = user.user.uid;
      await AsyncStorage.setItem('userId', userId);
      navigation.replace('Home');
    } catch (error) {
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = "Correo o contraseña incorrectos";
          break;
        case 'auth/invalid-email':
          errorMessage = "Email inexistente.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No se encontró un usuario con este correo.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión. Verifique su internet.";
          break;
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={bg} style={styles.containerBackground} resizeMode="cover">
        <View style={styles.overlay} />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image source={require('../assets/copy.png')} style={styles.logo} />
          </View>

          <Text style={styles.label}>Usuario o Correo Electrónico</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="andino@gmail.com"
              placeholderTextColor="#ccc"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {emailError.length > 0 && (
            <Text style={{ color: 'red', marginBottom: 5 }}>{emailError}</Text>
          )}

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#ccc"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.iconButton}
            >
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="#888" />
            </TouchableOpacity>
          </View>
          {passwordError.length > 0 && (
            <Text style={{ color: 'red', marginBottom: 5 }}>{passwordError}</Text>
          )}

          <TouchableOpacity>
            <Text style={styles.forgotText}>Olvidé o bloqueé mi usuario y contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.buttonPrimary, isButtonDisabled && { opacity: 0.5 }]}
            onPress={handleLogin}
            disabled={isButtonDisabled}
          >
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.buttonGoogle}>
              <FontAwesome name="google" size={20} color={COLORS.secondary} style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonTextGoogle}>Iniciar con Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFacebook}>
              <FontAwesome name="facebook" size={20} color={COLORS.text} style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonTextFacebook}>Iniciar con Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              ¿No tienes cuenta? <Text style={styles.signUpLinkText}>Regístrate</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
