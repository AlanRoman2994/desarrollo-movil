import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PerfilScreen({ navigation }) {
  const [nombre, setNombre] = useState('Alan');
  const [email, setEmail] = useState('andino@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    Alert.alert("Guardado", "Datos actualizados correctamente");
 };

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>Perfil</Text>

      {/* Foto */}
      <TouchableOpacity style={styles.photoContainer}>
        <Image source={require('../assets/logo_andino.png')} style={styles.photo} />
        <Text style={styles.changePhotoText}>Cambiar foto</Text>
      </TouchableOpacity>

      {/* Nombre */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      {/* Contraseña */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.togglePassword}>{showPassword ? "Ocultar" : "Mostrar"}</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Guardar cambios</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding: 20, backgroundColor:'#fff' },
  title: { fontSize:24, fontWeight:'bold', marginBottom:20 },
  photoContainer: { alignItems:'center', marginBottom:20 },
  photo: { width:100, height:100, borderRadius:50, marginBottom:10 },
  changePhotoText: { color:'#5A3D8A', fontWeight:'bold' },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:8, padding:10, marginBottom:15 },
  passwordContainer: { flexDirection:'row', alignItems:'center', borderWidth:1, borderColor:'#ccc', borderRadius:8, marginBottom:15, paddingRight:10 },
  inputPassword: { flex:1, padding:10 },
  togglePassword: { color:'#5A3D8A', fontWeight:'bold' },
  saveButton: { backgroundColor:'#5A3D8A', padding:15, borderRadius:8, alignItems:'center' },
  saveText: { color:'#fff', fontWeight:'bold', fontSize:16 },
});
