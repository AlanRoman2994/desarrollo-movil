// screens/SignUp.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import { auth, db } from "../src/config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const COLORS = {
  primary: "#6A1B9A",
  secondary: "#4A148C",
  text: "#FFFFFF",
  textDark: "#000000",
  textSecondary: "#666666",
  inputBackground: "#6A1B9A",
  error: "#FF0000",
};

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    setPasswordMatchError(password && text && password !== text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setPasswordMatchError(confirmPassword && text !== confirmPassword);
  };

  const handleSignUp = async () => {
    setPasswordMatchError(false);

    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Ingrese un correo electrónico válido.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Error",
        "La contraseña debe tener al menos 6 caracteres, incluyendo una letra mayúscula, una minúscula y un número."
      );
      return;
    }

try {
  // Registrar usuario con Firebase Auth
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Obtener el usuario recién creado
  const user = userCredential.user;
  console.log("User ID:", user.uid, "Email:", user.email);

  // Guardar perfil en Firestore (colección "perfiles")
  await setDoc(doc(db, "perfiles", user.uid), {
    uid: user.uid,
    email: user.email,
    username,
    firstName,
    lastName,
    createdAt: new Date().toISOString(),
  });

  Alert.alert("Registro exitoso", "Usuario registrado con éxito. Por favor, inicie sesión.");
      navigation.replace("Login");
    } catch (error) {
      let errorMessage = "Hubo un problema al registrar el usuario.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "El correo electrónico ya está en uso.";
          break;
        case "auth/invalid-email":
          errorMessage = "El formato del correo electrónico no es válido.";
          break;
        case "auth/weak-password":
          errorMessage = "La contraseña es demasiado débil.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Error de conexión, por favor intenta más tarde.";
          break;
        default:
          console.error("Error de Firebase:", error);
          errorMessage = "Error desconocido. Intente nuevamente.";
          break;
      }
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.text }}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require("../assets/logo_andino.png")} style={styles.logo} />
        </View>

        <Text style={styles.title}>Crear Cuenta</Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color={COLORS.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor={COLORS.text}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={20} color={COLORS.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            placeholderTextColor={COLORS.text}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="tag" size={20} color={COLORS.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nombre de Usuario"
            placeholderTextColor={COLORS.text}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="envelope" size={20} color={COLORS.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor={COLORS.text}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color={COLORS.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={COLORS.text}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
            <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <Text style={styles.passwordHint}>
          La contraseña debe contener más de 6 caracteres, incluyendo mayúscula, minúscula y número.
        </Text>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color={COLORS.text} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            placeholderTextColor={COLORS.text}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.iconButton}
          >
            <FontAwesome5
              name={showConfirmPassword ? "eye-slash" : "eye"}
              size={20}
              color={COLORS.text}
            />
          </TouchableOpacity>
        </View>

        {passwordMatchError && <Text style={styles.errorText}>Las contraseñas no coinciden.</Text>}

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleSignUp}>
          <Text style={styles.buttonText}>REGISTRARSE</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginLink}>
          <Text style={styles.loginText}>
            ¿Ya tienes una cuenta? <Text style={styles.loginLinkText}>Iniciar Sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
