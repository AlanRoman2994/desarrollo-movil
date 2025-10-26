// src/styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    color: "#007bff",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export const COLORS = {
  primaryPurple: "#7F40BF",
  blueButton: "#1A5B8E",
  greenButton: "#28A745",
  accentPurple: "#9B59B6",
  secondaryBlue: "#4A90E2",
  white: "#ffffffff",
  gray: "#f5f5f5a4",
  black: "#000000",
  headerPurple: "#7F40BF",

  primary: '#6A1B9A', // Púrpura Oscuro
  secondary: '#4A148C', // Púrpura más oscuro para el botón
  text: '#FFFFFF',
  textSecondary: '#D0D0D0',
  inputBackground: '#FFFFFF', // Lo usaremos como base, pero cambiaremos la opacidad/color en los estilos
  googleRed: '#DB4437',
  facebookBlue: '#4267B2',
  forgotText: '#4A148C', // Morado oscuro para el texto de olvido
};

export const documentStyle={
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: COLORS.headerPurple,
  },
  leftIcon: {
    width: 40, // suficiente para que no quede pegado al título
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    flex: 1,
  },
  rightSpace: {
    width: 40, // espacio igual que la flecha para centrar visualmente
  },
  bodyContainer: {
    padding: 20,
    paddingTop: 30,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
}

export const loginStyle={
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
}

export const homeStyle={
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
}