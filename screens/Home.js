import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const COLORS = {
  primaryPurple: "#5A3D8A",
  headerPurple: "#7A5AAB",
  white: "#FFFFFF",
  lightGreen: "#C8E8C9",
  darkGreenText: "#388E3C",
  lightGray: "#DDDDDD",
  gray: "#808080",
  black: "#000000",
};

const screenWidth = Dimensions.get("window").width;
const columnWidth = (screenWidth - 60) / 2;
const ROW_MARGIN_BOTTOM = 15;
const SMALL_BUTTON_SIZE = 55;
const SMALL_ROW_HEIGHT = SMALL_BUTTON_SIZE + ROW_MARGIN_BOTTOM;
const TALL_BUTTON_HEIGHT = SMALL_ROW_HEIGHT * 2 - ROW_MARGIN_BOTTOM;

const DashboardButton = ({ title, iconName, onPress }) => (
  <TouchableOpacity style={styles.dashboardButton} onPress={onPress}>
    <MaterialCommunityIcons name={iconName} size={40} color={COLORS.white} />
    <Text style={styles.dashboardText}>{title}</Text>
  </TouchableOpacity>
);

const SmallIconButton = ({ iconName, onPress }) => (
  <TouchableOpacity style={styles.smallIconButton} onPress={onPress}>
    <MaterialCommunityIcons name={iconName} size={24} color={COLORS.white} />
  </TouchableOpacity>
);

const Home = ({ navigation, userName = "Usuario" }) => {
  const [userProfileLetter, setUserProfileLetter] = useState(userName[0].toUpperCase());
  const [syncTime] = useState("12:30hs");

  useEffect(() => {
   
    setUserProfileLetter(userName[0].toUpperCase());
    console.log(userName);
  }, [userName]);

  const handlePress = (action) => {
    console.log(`Acción presionada: ${action}`);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.headerPurple} />
      <SafeAreaView style={{ backgroundColor: COLORS.headerPurple }} />

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
            <MaterialCommunityIcons
              name="check-circle"
              size={12}
              color={COLORS.white}
              style={{ marginLeft: 4 }}
            />
          </View>

          <View style={styles.welcomeRow}>
            <Text style={styles.welcomeText}>Bienvenido </Text>
            <Text style={styles.userNameText}>Facu</Text>
          </View>

          <View style={styles.syncRow}>
            <Text style={styles.syncText}>Última sincronización</Text>
            <Text style={styles.syncTimeText}>{syncTime}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBarContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={COLORS.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor={COLORS.gray}
          />
        </View>

        <View style={styles.gridWrapper}>
          <View style={styles.gridColumn}>
            <DashboardButton title="Productos" iconName="package-variant" onPress={() => handlePress("Productos")} />

            <View style={styles.smallButtonsRow}>
              <SmallIconButton iconName="package-variant-plus" onPress={() => handlePress("AddProduct")} />
              <SmallIconButton iconName="package-variant-minus" onPress={() => handlePress("RemoveProduct")} />
            </View>

            <View style={styles.smallButtonsRow}>
              <SmallIconButton iconName="account-plus" onPress={() => handlePress("AddUser")} />
              <SmallIconButton iconName="account-minus" onPress={() => handlePress("RemoveUser")} />
            </View>

            <View style={styles.smallButtonsRow}>
              <SmallIconButton iconName="bell-outline" onPress={() => handlePress("Notifications")} />
              <SmallIconButton iconName="book-outline" onPress={() => handlePress("Contactos")} />
            </View>

            <View style={styles.smallButtonsRowLast}>
              <SmallIconButton iconName="help-circle-outline" onPress={() => handlePress("Help")} />
              <SmallIconButton iconName="map-marker-outline" onPress={() => handlePress("Location")} />
            </View>
          </View>

          <View style={styles.gridColumn}>
            <DashboardButton title="Documentos" iconName="file-document-outline" onPress={() => handlePress("Documentos")} />
            <View style={styles.tallSpacer} />
            <DashboardButton title="Gastos" iconName="cash-multiple" onPress={() => handlePress("Gastos")} />
            <View style={styles.tallSpacer} />
            <DashboardButton title="Estadísticas" iconName="chart-line" onPress={() => handlePress("Estadísticas")} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => handlePress("Inicio")}>
          <MaterialCommunityIcons name="home-outline" size={24} color={COLORS.primaryPurple} />
          <Text style={styles.navTextActive}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => handlePress("Menu")}>
          <MaterialCommunityIcons name="menu" size={24} color={COLORS.gray} />
          <Text style={styles.navTextInactive}>Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.headerPurple,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
  },
  backButton: {
    marginRight: 10,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
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
  profileText: {
    color: COLORS.primaryPurple,
    fontSize: 28,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
    paddingTop: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    alignSelf: 'flex-start',
  },
  accountStatus: {
    color: COLORS.white,
    fontSize: 12,
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  welcomeText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  userNameText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  syncRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'baseline',
  },
  syncText: {
    color: COLORS.white,
    fontSize: 12,
  },
  syncTimeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    paddingHorizontal: 15,
    marginVertical: 15,
    height: 50,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 10,
  },
  gridWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridColumn: {
    width: columnWidth,
  },
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
  dashboardText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
  },
  smallButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: ROW_MARGIN_BOTTOM,
    height: SMALL_BUTTON_SIZE,
  },
  smallButtonsRowLast: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: SMALL_BUTTON_SIZE,
    marginBottom: 0,
  },
  smallIconButton: {
    backgroundColor: COLORS.primaryPurple,
    borderRadius: SMALL_BUTTON_SIZE / 2,
    width: SMALL_BUTTON_SIZE,
    height: SMALL_BUTTON_SIZE,
    justifyContent: "center",
    alignItems: "center",
  },
  tallSpacer: {
    height: SMALL_ROW_HEIGHT,
  },
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
  navItem: {
    alignItems: "center",
  },
  navTextActive: {
    color: COLORS.primaryPurple,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  navTextInactive: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },
});
