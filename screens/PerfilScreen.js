import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import * as ImagePicker from 'expo-image-picker';

export default function PerfilScreen({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;

  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('3874567890');
  const [fotoUri, setFotoUri] = useState('');

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [nuevoEmail, setNuevoEmail] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');

  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
      setNombre(user.displayName || '');
      setUsuario(user.displayName || '');
      setFotoUri(user.photoURL || '');
    }
  }, []);

  const ultimosDigitos = telefono.slice(-4);

  const handleCambiarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permiso.granted) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para cambiar la foto.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      const uri = resultado.assets[0].uri;
      setFotoUri(uri);

      try {
        await updateProfile(user, { photoURL: uri });
        Alert.alert('Foto actualizada', 'La foto de perfil se cambió correctamente');
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (nuevoEmail) {
        await updateEmail(user, nuevoEmail);
        setEmail(nuevoEmail);
        setNuevoEmail('');
      }

      if (nuevaContraseña) {
        await updatePassword(user, nuevaContraseña);
        setNuevaContraseña('');
      }

      if (nuevoNombre || nuevoUsuario) {
        await updateProfile(user, {
          displayName: nuevoUsuario || nuevoNombre,
        });
        setNombre(nuevoNombre || nombre);
        setUsuario(nuevoUsuario || usuario);
        setNuevoNombre('');
        setNuevoUsuario('');
      }

      Alert.alert('Éxito', 'Datos actualizados correctamente');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Banda morada con flecha y título */}
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mi perfil</Text>
        </View>

        {/* Foto centrada */}
        <View style={styles.photoContainer}>
          <Image
            source={fotoUri ? { uri: fotoUri } : require('../assets/logo_andino.png')}
            style={styles.photo}
          />
          <TouchableOpacity onPress={handleCambiarFoto}>
            <Text style={styles.changePhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta de perfil */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Nombre: {nombre}</Text>
          <Text style={styles.cardText}>Usuario: {usuario}</Text>
          <Text style={styles.cardText}>Email: {email}</Text>
          <Text style={styles.cardText}>Teléfono: ••••{ultimosDigitos}</Text>
        </View>

        {/* Campos para editar */}
        <Text style={styles.sectionTitle}>Editar datos</Text>

        <TextInput
          style={styles.input}
          placeholder="Nuevo nombre"
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
        />

        <TextInput
          style={styles.input}
          placeholder="Nuevo usuario"
          value={nuevoUsuario}
          onChangeText={setNuevoUsuario}
        />

        <TextInput
          style={styles.input}
          placeholder="Nuevo email"
          value={nuevoEmail}
          onChangeText={setNuevoEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          secureTextEntry
          value={nuevaContraseña}
          onChangeText={setNuevaContraseña}
        />

        {/* Botón Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Guardar cambios</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A3D8A',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
  },
  photoContainer: { alignItems: 'center', marginVertical: 20 },
  photo: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  changePhotoText: { color: '#5A3D8A', fontWeight: 'bold' },
  card: {
    backgroundColor: '#F3F0FA',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: { fontSize: 16, marginBottom: 5, color: '#333' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  saveButton: {
    backgroundColor: '#5A3D8A',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 20,
  },
  saveText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

