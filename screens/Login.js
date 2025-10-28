import React, { useState } from 'react';
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
  StyleSheet,
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

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingrese su correo y contraseña.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Ingrese un correo electrónico válido.");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userId = user.user.uid;
      await AsyncStorage.setItem('userId', userId);
      navigation.replace('Home');
    } catch (error) {
      let errorMessage = "Hubo un problema al iniciar sesión.";
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = "Correo o password incorrecto";
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
        {/* Capa de oscurecimiento */}
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

          <TouchableOpacity>
            <Text style={styles.forgotText}>Olvidé o bloqueé mi usuario y contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
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
