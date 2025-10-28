import React, { useId, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { auth } from '../src/config/firebaseConfig';
// Definición de Colores de la Imagen:
const COLORS = {
  primary: '#6A1B9A', // Púrpura Oscuro
  secondary: '#4A148C', // Púrpura más oscuro para el botón
  text: '#FFFFFF',
  textSecondary: '#D0D0D0',
  inputBackground: '#FFFFFF', // Lo usaremos como base, pero cambiaremos la opacidad/color en los estilos
  googleRed: '#DB4437',
  facebookBlue: '#4267B2',
  forgotText: '#4A148C', // Morado oscuro para el texto de olvido
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Función básica de validación de formato de email
  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  // Función de inicio de sesión (Mantenemos la lógica Firebase)
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
      let user=await signInWithEmailAndPassword(auth, email, password);
      
      let userId=user.user.uid
      let response=await AsyncStorage.setItem('userId', userId);
    
      
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
        case 'auth/wrong-password':
          errorMessage = "Credenciales inválidas. Verifique su correo y contraseña.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No se encontró un usuario con este correo.";
          break;
        case 'auth/network-request-failed':
          errorMessage = "Error de conexión. Verifique su internet.";
          break;
        default:
          console.error(error);
          errorMessage = "Error desconocido. Intente nuevamente.";
          break;
      }
      Alert.alert("Error", errorMessage);
    }
  };
 
 
  // Funciones placeholder para botones sociales
  const handleGoogleLogin = () => Alert.alert("Google", "Iniciar sesión con Google.");
  const handleFacebookLogin = () => Alert.alert("Facebook", "Iniciar sesión con Facebook.");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        
        {/* Logo (Usamos la ruta probable y el estilo del nuevo diseño) */}
        <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/logo_andino.png')} 
              style={styles.logo} 
            />
        </View>

        {/* --- Formulario --- */}
        <Text style={styles.label}>Usuario o Correo Electrónico</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="andino@gmail.com"
            placeholderTextColor="#888"
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
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          {/* Ojo/Ocultar Contraseña */}
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
            <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="#888" />
          </TouchableOpacity>
          {/* Lupa/Zoom (Placeholder funcionalmente) */}
          <TouchableOpacity onPress={() => ("biometria", "Desbloqueo con huella o FaceId.")} style={styles.iconbutton}>
            <FontAwesome5 name="fingerprint" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Texto "Olvidaste o bloqueaste" */}
        <TouchableOpacity onPress={() => { /* navigation.navigate('Recover') */ }}>
          <Text style={styles.forgotText}>Olvide o bloquie mi usuario y contraseña</Text>
        </TouchableOpacity>

        {/* Botón Principal - Iniciar Sesión */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        </TouchableOpacity>

        {/* --- Botones Sociales --- */}
        <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.buttonGoogle} onPress={handleGoogleLogin}>
              <FontAwesome name="google" size={20} color={COLORS.secondary} style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonTextGoogle}>Iniciar con Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonFacebook} onPress={handleFacebookLogin}>
              <FontAwesome name="facebook" size={20} color={COLORS.text} style={{ marginRight: 10 }} />
              <Text style={styles.socialButtonTextFacebook}>Iniciar con Facebook</Text>
            </TouchableOpacity>
        </View>


        {/* Navegación a Registro */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpLink}>
          <Text style={styles.signUpText}>¿No tienes cuenta? <Text style={styles.signUpLinkText}>Regístrate</Text></Text>
        </TouchableOpacity>

        {/* El "Made With Vercel/Logo footer" se ha eliminado de aquí. */}
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: COLORS.primary, 
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  label: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    alignSelf: 'flex-start',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Nuevo fondo para suavizar el contraste
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
    height: 50,
    // Borde suave para definir el cuadro sin que sea tosco
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.4)', 
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#000',
    fontSize: 16,
  },
  iconButton: {
      padding: 5,
      marginLeft: 10,
  },
  forgotText: {
    marginTop: 5,
    color: COLORS.text, 
    fontSize: 14,
    textDecorationLine: 'none',
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  buttonPrimary: {
    backgroundColor: COLORS.secondary, 
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.text, 
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  buttonGoogle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Fondo más suave y texto púrpura para Google
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  buttonFacebook: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.secondary,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    height: 50,
  },
  socialButtonTextGoogle: { // Estilo específico para Google (texto oscuro)
    color: COLORS.secondary, 
    fontSize: 14,
    fontWeight: '600',
  },
  socialButtonTextFacebook: { // Estilo específico para Facebook (texto claro)
    color: COLORS.text, 
    fontSize: 14,
    fontWeight: '600',
  },
  signUpLink: {
    marginTop: 10,
  },
  signUpText: {
    color: COLORS.text,
    fontSize: 15,
    textAlign: 'center',
  },
  signUpLinkText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // Se elimina el estilo footerText ya que el elemento se eliminó del renderizado.
});