import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/config/firebaseConfig";
import Menu from "../screens/Menu";

const COLORS = {
  primaryPurple: "#5A3D8A",
  headerPurple: "#7A5AAB",
  white: "#FFFFFF",
  lightGray: "#DDDDDD",
  gray: "#808080",
  black: "#000000",
};

const screenWidth = Dimensions.get("window").width;
const columnWidth = (screenWidth - 60) / 2;
const ROW_MARGIN_BOTTOM = 15;
const TALL_BUTTON_HEIGHT = 130;

const DashboardButton = ({ title, iconName, navigation, targetScreen }) => (
  <TouchableOpacity
    style={styles.dashboardButton}
    onPress={() => {
      if (targetScreen) navigation.navigate(targetScreen);
      else console.log(`Acción presionada: ${title}`);
    }}
  >
    <MaterialCommunityIcons name={iconName} size={40} color={COLORS.white} />
    <Text style={styles.dashboardText}>{title}</Text>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const [userProfileLetter, setUserProfileLetter] = useState("");
  const [userName, setUserName] = useState("");
  const [syncTime] = useState("12:30hs");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-screenWidth * 0.75)).current;

  const getUser = async () => {
    const storedUserId = await AsyncStorage.getItem("userId");
    if (storedUserId) {
      const userRef = doc(db, "perfiles", storedUserId);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      if (userData?.firstName) setUserName(userData.firstName);
    }
  };

  useEffect(() => {
    getUser();
    if (userName) setUserProfileLetter(userName[0]);
  }, [userName]);

  const toggleSidebar = () => {
    if (sidebarVisible) {
      Animated.timing(sidebarAnim, {
        toValue: -screenWidth * 0.75,
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
      toValue: -screenWidth * 0.75,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }} />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>

        <View style={styles.profileLetterContainer}>
          <Text style={styles.profileText}>{userProfileLetter}</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.statusRow}>
            <Text style={styles.accountStatus}>Cuenta Activa</Text>
            <MaterialCommunityIcons name="check-circle" size={12} color={COLORS.white} style={{ marginLeft: 4 }} />
          </View>

          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeText}>Bienvenido </Text>
            <Text style={styles.userNameText}>{userName}</Text>
          </View>

          <View style={styles.syncRow}>
            <Text style={styles.syncText}>Última sincronización</Text>
            <Text style={styles.syncTimeText}>{syncTime}</Text>
          </View>
        </View>
      </View>

      {/* GRILLA CENTRAL (solo 4 botones) */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.gridWrapper}>
          <View style={styles.gridColumn}>
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

          <View style={styles.gridColumn}>
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

      {/* MENÚ INFERIOR */}
      <View style={styles.bottomNav}>
        
        <TouchableOpacity style={styles.navItem} onPress={toggleSidebar}>
          <MaterialCommunityIcons name="menu" size={24} color={COLORS.gray} />
          <Text style={styles.navTextInactive}>Menú</Text>
        </TouchableOpacity>
      </View>

      {/* SIDEBAR */}
      {sidebarVisible && (
        <TouchableWithoutFeedback onPress={closeSidebar}>
          <View style={styles.overlay}>
            <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
              <Menu closeSidebar={closeSidebar} />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: COLORS.white },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.headerPurple,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  backButton: { marginRight: 10, alignSelf: "flex-start", marginTop: 10 },
  profileLetterContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    marginTop: 5,
  },
  profileText: { color: COLORS.primaryPurple, fontSize: 28, fontWeight: "bold" },
  userInfo: { flex: 1, paddingTop: 10 },
  statusRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  accountStatus: { color: COLORS.white, fontSize: 12 },
  welcomeRow: { flexDirection: "row", alignItems: "baseline", marginBottom: 2 },
  welcomeText: { color: COLORS.white, fontSize: 22, fontWeight: "bold" },
  userNameText: { color: COLORS.white, fontSize: 22, fontWeight: "bold" },
  syncRow: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
  syncText: { color: COLORS.white, fontSize: 12 },
  syncTimeText: { color: COLORS.white, fontSize: 14, fontWeight: "600" },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  gridWrapper: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  gridColumn: { width: columnWidth },
  dashboardButton: {
    width: "100%",
    height: TALL_BUTTON_HEIGHT,
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: ROW_MARGIN_BOTTOM,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  dashboardText: { color: COLORS.white, fontSize: 18, fontWeight: "600", marginTop: 8, textAlign: "center" },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    zIndex: 10,
  },
  navItem: { alignItems: "center" },
  navTextActive: { color: COLORS.primaryPurple, fontSize: 12, fontWeight: "600", marginTop: 2 },
  navTextInactive: { color: COLORS.gray, fontSize: 12, marginTop: 2 },
  overlay: { position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" },
  sidebar: { position: "absolute", top: 0, bottom: 0, width: screenWidth * 0.75, backgroundColor: COLORS.white, padding: 20 },
});
