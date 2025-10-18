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
  const isMobile = width < 600; // definición de móvil
  const [userProfileLetter, setUserProfileLetter] = useState("");
  const [userName, setUserName] = useState("");
  const [syncTime] = useState("12:30hs");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-width * 0.75)).current;

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
  }, []);

  useEffect(() => {
    if (userName) setUserProfileLetter(userName[0]);
  }, [userName]);

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
              <Text style={styles.accountStatus}>Cuenta Activa</Text>
              <MaterialCommunityIcons
                name="check-circle"
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
              <Text style={styles.syncTimeText}>{syncTime}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* GRILLA CENTRAL */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainerCentered,
          { paddingTop: height * 0.05 }, // padding proporcional
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

      {/* MENÚ INFERIOR */}
      {!sidebarVisible && (
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={toggleSidebar}>
            <MaterialCommunityIcons name="menu" size={24} color={COLORS.gray} />
            <Text style={styles.navTextInactive}>Menú</Text>
          </TouchableOpacity>
        </View>
      )}

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
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingBottom: 10 },
  backButton: { marginRight: 10 },
  profileLetterContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  profileText: { color: COLORS.primaryPurple, fontSize: 24, fontWeight: "bold" },
  userInfo: { flex: 1 },
  statusRow: { flexDirection: "row", alignItems: "center" },
  accountStatus: { color: COLORS.white, fontSize: 12, fontWeight: "600" },
  welcomeRow: { flexDirection: "row", alignItems: "center" },
  welcomeText: { color: COLORS.white, fontSize: 14 },
  userNameText: { color: COLORS.white, fontWeight: "bold", marginLeft: 4 },
  syncRow: { flexDirection: "row", alignItems: "center" },
  syncText: { color: COLORS.white, fontSize: 12 },
  syncTimeText: { color: COLORS.white, marginLeft: 4 },

  scrollContainerCentered: {
    marginTop:50,
    padding: 20,
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  gridWrapper: {
    justifyContent: "space-between",
    width: "100%",
  },
  gridColumn: {
    flex: 1,
    marginBottom: 15,
  },
  dashboardButton: {
    backgroundColor: COLORS.primaryPurple,
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dashboardText: { color: COLORS.white, fontSize: 16, marginTop: 10, fontWeight: "bold" },

  bottomNav: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: COLORS.lightGray,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    zIndex: 20,
    elevation: 20,
  },
  navItem: { alignItems: "center", flex: 1 },
  navTextInactive: { color: COLORS.gray, fontSize: 12, marginTop: 2 },

  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "75%",
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowOffset: { width: 2, height: 0 },
    elevation: 8,
  },
});
