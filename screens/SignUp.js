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
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../src/config/firebaseConfig';
import { COLORS } from '../src/config/styles';
import bg from '../assets/bg.png';
import {PasswordRequirements} from "../screens/PasswordRequirements"
// Componente de requisitos de contraseña

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const isPasswordValid =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
  const handleSignUp = async () => {
    if (!email || !password || !nombre) {
      Alert.alert('Error', 'Por favor complete todos los campos.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Ingrese un correo electrónico válido.');
      return;
    }
 PasswordRequirements(password)
    
 if (!isPasswordValid) {
      Alert.alert('Error', 'La contraseña no cumple con los requisitos.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: nombre });
      Alert.alert('¡Registro exitoso!', 'Ahora podés iniciar sesión.');
      navigation.replace('Login');
    } catch (error) {
      let errorMessage = 'Hubo un problema al registrarse.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está registrado.';
      }
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground source={bg} style={styles.containerBackground} resizeMode="cover">
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Image source={require('../assets/copy.png')} style={styles.logo} />
          </View>

          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor="#ccc"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <Text style={styles.label}>Correo Electrónico</Text>
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
              <FontAwesome5 name={showPassword ? 'eye-slash' : 'eye'} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          <PasswordRequirements password={password} />

          <TouchableOpacity
            style={[styles.buttonPrimary, { opacity: isPasswordValid ? 1 : 0.5 }]}
            disabled={!isPasswordValid}
            onPress={handleSignUp}
          >
            <Text style={styles.buttonText}>REGISTRARSE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signUpLink}>
            <Text style={styles.signUpText}>
              ¿Ya tenés cuenta? <Text style={styles.signUpLinkText}>Iniciar sesión</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: COLORS.text,
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  title: {
    color: COLORS.secondary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    color: COLORS.text,
    fontSize: 16,
  },
  iconButton: {
    padding: 5,
    marginLeft: 10,
  },
  passwordHint: {
    color: COLORS.textSecondary,
    fontSize: 12,
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 10,
    paddingLeft: 5,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: 20,
    paddingLeft: 5,
  },
  buttonPrimary: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 14,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 10,
  },
  loginText: {
    color: COLORS.textDark,
    fontSize: 15,
    textAlign: "center",
  },
  loginLinkText: {
    color: COLORS.secondary,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
