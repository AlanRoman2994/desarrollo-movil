import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
  Platform,
  useWindowDimensions,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../src/config/firebaseConfig";
import Menu from "../screens/Menu";
import { COLORS, homeStyle as styles } from "../src/config/styles";
import fondo from "../assets/home.png";

const DashboardButton = ({ title, iconName, navigation, targetScreen }) => (
  <TouchableOpacity
    style={styles.dashboardButton}
    onPress={() => navigation.getParent()?.navigate(targetScreen)}
  >
    <MaterialCommunityIcons name={iconName} size={40} color={COLORS.white} />
    <Text style={styles.dashboardText}>{title}</Text>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 600;
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-width * 0.75)).current;

  const user = auth.currentUser;
  const userName = user?.displayName || "Usuario";
  const userProfileLetter = userName.charAt(0).toUpperCase();
  const isActive = user?.emailVerified;
  const lastSync = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -width * 0.75,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setSidebarVisible(false));
    } else {
      setSidebarVisible(true);
      Animated.timing(sidebarAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />

      {/* HEADER */}
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }}>
        <View
          style={[
            styles.header,
            { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10 },
          ]}
        >
          <View style={styles.profileLetterContainer}>
            <Text style={styles.profileText}>{userProfileLetter}</Text>
          </View>

          <View style={styles.userInfo}>
            <View style={styles.statusRow}>
              <Text style={styles.accountStatus}>
                {isActive ? "Cuenta Activa" : "Cuenta no verificada"}
              </Text>
              <MaterialCommunityIcons
                name={isActive ? "check-circle" : "alert-circle"}
                size={12}
                color={COLORS.white}
                style={{ marginLeft: 4 }}
              />
            </View>

            <View style={styles.welcomeRow}>
              <Text style={styles.welcomeText}>Bienvenido </Text>
              <Text style={styles.userNameText}>{userName}</Text>
            </View>

            <View style={styles.syncRow}>
              <Text style={styles.syncText}>Última sincronización</Text>
              <Text style={styles.syncTimeText}>{lastSync}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* SCROLL CON IMAGEN DE FONDO */}
      <ImageBackground
        source={fondo}
        style={{ flex: 1, width: "100%", height: "90%" }}
        resizeMode="stretch"
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainerCentered,
            { paddingTop: height * 0.05 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.gridWrapper,
              {
                flexDirection: isMobile ? "column" : "row",
                maxWidth: isMobile ? "100%" : 600,
              },
            ]}
          >
            <View style={[styles.gridColumn, { marginRight: isMobile ? 0 : 10 }]}>
              <DashboardButton
                title="Productos"
                iconName="package-variant"
                navigation={navigation}
                targetScreen="Productos"
              />
              <DashboardButton
                title="Proveedores"
                iconName="account-multiple"
                navigation={navigation}
                targetScreen="Proveedores"
              />
            </View>

            <View style={[styles.gridColumn, { marginRight: 0 }]}>
              <DashboardButton
                title="Pedidos"
                iconName="cart-outline"
                navigation={navigation}
                targetScreen="Pedidos"
              />
              <DashboardButton
                title="Documentos"
                iconName="file-document-outline"
                navigation={navigation}
                targetScreen="Documentos"
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>

      {/* MENÚ INFERIOR */}
      {!sidebarVisible && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={toggleSidebar}>
            <MaterialCommunityIcons name="menu" size={24} color={COLORS.accentPurple} />
            <Text style={styles.navTextInactive}>Menú</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* SIDEBAR */}
      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
              <Menu closeSidebar={closeSidebar} navigation={navigation} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default Home;
