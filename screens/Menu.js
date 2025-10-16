import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, ScrollView, StatusBar, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../src/config/firebaseConfig';

import { signOut } from 'firebase/auth';

const { width, height } = Dimensions.get('window');

const COLORS = {
  primaryPurple: '#5A3D8A',
  headerPurple: '#7A5AAB',
  white: '#FFFFFF',
  lightGray: '#DDDDDD',
  gray: '#808080',
  black: '#000000',
  red: '#E53935',
};

const MenuItem = ({ icon, text, onPress, showArrow = true, badge = null, isNew = false }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <MaterialCommunityIcons name={icon} size={24} color={COLORS.black} />
    <Text style={styles.menuItemText}>{text}</Text>
    {badge && (
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
    )}
    {isNew && (
      <View style={styles.newTag}>
        <Text style={styles.newTagText}>NUEVO</Text>
      </View>
    )}
    {showArrow && <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.gray} />}
  </TouchableOpacity>
);

const Sidebar = ({ navigation }) => {
  const userProfileLetter = 'A';
  const userName = 'Alan';

  const handlePress = (item) => {
    console.log(`Navegar a: ${item}`);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login"); // Redirige a pantalla de login
      })
      .catch((error) => {
        console.log("Error al cerrar sesión:", error);
        Alert.alert("Error", "No se pudo cerrar sesión");
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />

      <View style={styles.mainContainer}>
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <View style={styles.profileLetterContainer}>
              <Text style={styles.profileText}>{userProfileLetter}</Text>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.accountStatus}>
                <Text style={styles.accountStatusText}>Cuenta Activa</Text>
                <MaterialCommunityIcons
                  name="check-circle"
                  size={16}
                  color={COLORS.white}
                  style={{ marginLeft: 5 }}
                />
              </View>
              <Text style={styles.welcomeText}>
                Bienvenido <Text style={styles.userName}>{userName}</Text>
              </Text>
              <Text style={styles.lastSyncText}>
                Última sincronización <Text style={styles.lastSyncTime}>12:30hs</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Scroll principal */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.sectionTitle}>SECCIONES PRINCIPALES</Text>
          <MenuItem icon="view-dashboard-outline" text="Panel de control" onPress={() => handlePress('Panel de control')} />
          <MenuItem icon="package-variant-closed" text="Envíos" onPress={() => handlePress('Envíos')} />
          <MenuItem icon="map-marker-path" text="Rutas" onPress={() => handlePress('Rutas')} />

          <Text style={styles.sectionTitle}>MÁS OPCIONES</Text>
          <MenuItem icon="bell-outline" text="Notificaciones" onPress={() => handlePress('Notificaciones')} badge="4" />
          <MenuItem icon="history" text="Historial" onPress={() => handlePress('Historial')} />
          <MenuItem icon="account-outline" text="Perfil" onPress={() => handlePress('Perfil')} />
          <MenuItem icon="cog-outline" text="Configuración" onPress={() => handlePress('Configuración')} />
          <MenuItem icon="lifebuoy" text="Centro de Ayuda" onPress={() => handlePress('Centro de Ayuda')} isNew />

          <Text style={styles.sectionTitle}>LEGAL</Text>
          <MenuItem icon="file-document-outline" text="Términos y Condiciones" onPress={() => handlePress('Términos y Condiciones')} />
          <MenuItem icon="shield-outline" text="Política de Privacidad" onPress={() => handlePress('Política de Privacidad')} />

          {/* BOTÓN CERRAR SESIÓN */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Barra inferior */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Home')}>
            <MaterialCommunityIcons name="home-outline" size={24} color={COLORS.primaryPurple} />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Mas')}>
            <MaterialCommunityIcons name="menu" size={24} color={COLORS.gray} />
            <Text style={styles.navTextInactive}>Más</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Sidebar;

// =================== ESTILOS ===================
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.headerPurple },
  mainContainer: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.headerPurple,
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
    minHeight: height * 0.14,
  },
  backButton: { paddingRight: 15, alignSelf: 'flex-start' },
  profileInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  profileLetterContainer: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  profileText: { color: COLORS.primaryPurple, fontSize: width * 0.06, fontWeight: 'bold' },
  userInfo: { flex: 1 },
  accountStatus: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  accountStatusText: { color: COLORS.primaryPurple, fontSize: width * 0.03 },
  welcomeText: { color: COLORS.white, fontSize: width * 0.045, fontWeight: 'bold', marginBottom: 2 },
  userName: { fontWeight: 'bold' },
  lastSyncText: { color: COLORS.primaryPurple, fontSize: width * 0.03 },
  lastSyncTime: { color: COLORS.white },
  scrollContainer: { paddingHorizontal: width * 0.05, paddingBottom: height * 0.12, paddingTop: height * 0.01 },
  sectionTitle: { fontSize: width * 0.03, color: COLORS.primaryPurple, fontWeight: 'bold', marginTop: height * 0.025, marginBottom: height * 0.01, textTransform: 'uppercase' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: height * 0.02, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray },
  menuItemText: { flex: 1, fontSize: width * 0.04, marginLeft: width * 0.03, color: COLORS.black },
  badgeContainer: { backgroundColor: COLORS.headerPurple, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  badgeText: { color: COLORS.white, fontSize: 12, fontWeight: 'bold' },
  newTag: { backgroundColor: COLORS.headerPurple, borderRadius: 5, paddingHorizontal: 6, paddingVertical: 2, marginRight: 10 },
  newTagText: { color: COLORS.white, fontSize: 10, fontWeight: 'bold' },
  logoutButton: { marginTop: 30, paddingVertical: 12, paddingHorizontal: 15, backgroundColor: COLORS.red, borderRadius: 8, alignItems: 'center' },
  logoutText: { color: COLORS.white, fontSize: width * 0.04, fontWeight: 'bold' },
  navItem: { alignItems: 'center', flex: 1 },
  navTextActive: { color: COLORS.primaryPurple, fontSize: width * 0.03, fontWeight: '600', marginTop: 2 },
  navTextInactive: { color: COLORS.gray, fontSize: width * 0.03, marginTop: 2 },
  bottomNav: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: COLORS.lightGray, paddingVertical: height * 0.02, backgroundColor: COLORS.white, zIndex: 20 }
});

