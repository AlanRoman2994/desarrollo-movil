export default function Home({ navigation }) {
  const [userName, setUserName] = useState('Usuario');
  const [userProfileLetter, setUserProfileLetter] = useState('A');
  const [loading, setLoading] = useState(true);

  // ... tu useEffect y demás funciones (igual que antes)

  if (loading) {
    return (
      <View style={styles.page}>
        <Text style={{ color: COLORS.secondary, fontSize: 18 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      {/* HEADER PERSONALIZADO */}
      <View style={styles.header}>
        {/* ... tu header */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* BARRA DE BÚSQUEDA */}
        <View style={styles.searchBar}>
          {/* ... search bar */}
        </View>

        {/* CUADRÍCULA DE BOTONES */}
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <GridButton key={index} item={item} onPress={handleGridPress} />
          ))}
        </View>

        {/* BOTÓN PROVEEDORES */}
        <TouchableOpacity style={styles.largeGreenButton} onPress={() => handleGridPress('Proveedores')}>
          <Text style={styles.largeGreenButtonText}>Proveedores</Text>
          <MaterialCommunityIcons name="truck-delivery-outline" size={24} color={COLORS.secondary} style={{marginLeft: 10}} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // --- PAGE CON FLEXBOX ---
  page: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start', // Comienza desde arriba
    alignItems: 'center',         // Centrado horizontal
    width: 390,
    height: 844,
    marginTop: 76,
    backgroundColor: '#FFFFFF',
  },

  // --- Resto de tus estilos ---
  scrollContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    width: '100%',
  },

  header: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
  },

  // ... resto de tus estilos tal como los tenías
});
