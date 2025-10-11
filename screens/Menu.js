import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Definición de colores
const COLORS = {
  primaryPurple: '#5A3D8A', // Morado principal (texto de secciones, activo en nav)
  headerPurple: '#7A5AAB', // Morado del encabezado
  white: '#FFFFFF',
  lightGray: '#DDDDDD',
  gray: '#808080', // Gris para íconos y flechas
  black: '#000000',
};

// Componente para cada ítem del menú (sin aplicar las recomendaciones de color/orden)
const MenuItem = ({ icon, text, onPress, showArrow = true, badge = null, isNew = false }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
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
    // navigation.navigate(item); // Descomentar para usar con React Navigation
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }} />

      {/* Encabezado del menú */}
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
              {/* Nota: En la imagen "Cuenta Activa" y "Última sincronización" tienen bajo contraste */}
              <Text style={styles.accountStatusText}>Cuenta Activa</Text>
              <MaterialCommunityIcons name="check-circle" size={16} color={COLORS.white} style={{ marginLeft: 5 }} />
            </View>
            <Text style={styles.welcomeText}>Bienvenido <Text style={styles.userName}>{userName}</Text></Text>
            <Text style={styles.lastSyncText}>Última sincronización <Text style={styles.lastSyncTime}>12:30hs</Text></Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* SECCIONES PRINCIPALES */}
        <Text style={styles.sectionTitle}>SECCIONES PRINCIPALES</Text>
        <MenuItem icon="view-dashboard-outline" text="Panel de control" onPress={() => handlePress('Panel de control')} />
        <MenuItem icon="package-variant-closed" text="Envíos" onPress={() => handlePress('Envíos')} />
        <MenuItem icon="map-marker-path" text="Rutas" onPress={() => handlePress('Rutas')} />

        {/* MÁS OPCIONES */}
        <Text style={styles.sectionTitle}>MÁS OPCIONES</Text>
        {/* Notificaciones (con el badge morado original) */}
        <MenuItem icon="bell-outline" text="Notificaciones" onPress={() => handlePress('Notificaciones')} badge="4" />
        <MenuItem icon="history" text="Historial" onPress={() => handlePress('Historial')} />
        <MenuItem icon="account-outline" text="Perfil" onPress={() => handlePress('Perfil')} />
        <MenuItem icon="cog-outline" text="Configuración" onPress={() => handlePress('Configuración')} />
        {/* Centro de Ayuda (con tag NUEVO) */}
        <MenuItem icon="lifebuoy" text="Centro de Ayuda" onPress={() => handlePress('Centro de Ayuda')} isNew={true} />
        
        {/* LEGAL */}
        <Text style={styles.sectionTitle}>LEGAL</Text>
        <MenuItem icon="file-document-outline" text="Términos y Condiciones" onPress={() => handlePress('Términos y Condiciones')} />
        <MenuItem icon="shield-outline" text="Política de Privacidad" onPress={() => handlePress('Política de Privacidad')} />
      </ScrollView>

      {/* Navegación inferior fija */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Home')}>
          <MaterialCommunityIcons name="home-outline" size={24} color={COLORS.primaryPurple} />
          <Text style={styles.navTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handlePress('Mas')}>
          <MaterialCommunityIcons name="menu" size={24} color={COLORS.gray} />
          <Text style={styles.navTextInactive}>mas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.headerPurple,
    paddingHorizontal: 20,
    paddingVertical: 15,
    minHeight: 120, 
  },
  backButton: {
    // Estilo para el ícono de flecha
    paddingRight: 15, 
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginTop: 10,
  },
  profileLetterContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileText: {
    color: COLORS.primaryPurple,
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  accountStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  // El color es Morado como en la imagen, a pesar del bajo contraste
  accountStatusText: { 
    color: COLORS.primaryPurple, 
    fontSize: 12,
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  userName: {
    fontWeight: 'bold',
  },
  // El color es Morado como en la imagen, a pesar del bajo contraste
  lastSyncText: { 
    color: COLORS.primaryPurple, 
    fontSize: 12,
  },
  lastSyncTime: {
    // El "12:30hs" es blanco, por lo que este estilo lo restaura
    color: COLORS.white, 
    fontWeight: 'normal',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, // Espacio para la barra de navegación inferior
  },
  sectionTitle: {
    fontSize: 12,
    color: COLORS.primaryPurple,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: COLORS.black,
  },
  badgeContainer: {
    // Morado oscuro para replicar la imagen
    backgroundColor: COLORS.headerPurple, 
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10, 
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  newTag: {
    // Morado oscuro para replicar la imagen
    backgroundColor: COLORS.headerPurple, 
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 10,
  },
  newTagText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
  },
  navTextActive: {
    color: COLORS.primaryPurple,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
  navTextInactive: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },
});