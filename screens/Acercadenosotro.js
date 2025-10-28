import React, { useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LOGO_URI = 'https://i.ibb.co/L5Qx7kK/COPY-FAC-ESLOGAN-AQU.png';

const LEGAL_LINKS = [
    { label: 'Política de Privacidad', url: 'https://tuweb.com/privacidad' },
    { label: 'Términos y Condiciones', url: 'https://tuweb.com/terminos' },
    { label: 'Preguntas Frecuentes (FAQ)', url: 'https://tuweb.com/faq' },
];

const Acercadenosotro = ({ navigation }) => {
    const [rating, setRating] = useState(0); // Guarda la cantidad de estrellas seleccionadas

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowBack}>
                    <Text style={styles.arrowText}>&#8592;</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Acerca de COPY-FAC</Text>
            </View>

            <ScrollView style={styles.scrollViewContent}>
                {/* Logo y versión */}
                <View style={styles.content}>
                    <Image source={{ uri: LOGO_URI }} style={styles.logoImg} /> 
                    <Text style={styles.appInfo}>COPY-FAC para Android</Text>
                    <Text style={styles.version}>Versión 1.0.0</Text>

                    <Text style={styles.legalInfo}>
                        Ciudad Salta – Barrio Catedral{"\n"}
                        Calle Pizarro 110{"\n"}
                        Tel: 38783542314
                    </Text>
                </View>

                {/* Misión y propósito */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nuestra Misión y Propósito</Text>
                    <Text style={styles.sectionText}>
                        En COPY-FAC trabajamos día a día para ofrecer soluciones integrales en papelería,
                        librería y servicios gráficos.{"\n\n"}
                        Nos comprometemos con la calidad en cada impresión y la atención personalizada.
                        Creemos en ser un apoyo fundamental para estudiantes, profesionales y empresas.
                    </Text>
                </View>

                {/* Servicios destacados */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nuestros Servicios Destacados</Text>
                    <Text style={styles.sectionText}>
                        • Librería y Papelería Completa: Útiles escolares, artículos de oficina, insumos de arte.{"\n"}
                        • Servicios Digitales y Gráficos: Fotocopias, impresiones a gran formato, encuadernaciones y escaneo.{"\n"}
                        • Personalización de Productos y atención a instituciones.
                    </Text>
                </View>

                {/* Enlaces legales */}
                <View style={styles.linksContainer}>
                    <Text style={styles.sectionTitle}>Información Legal</Text>
                    {LEGAL_LINKS.map((item, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={styles.linkItem}
                            onPress={() => console.log(`Presionó: ${item.label}`)} // solo loguea, sin abrir
                        >
                            <Text style={styles.linkText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ⭐ Calificación con estrellas */}
                <View style={styles.ratingContainer}>
                    <Text style={styles.sectionTitle}>Calificanos</Text>
                    <View style={styles.starsRow}>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <TouchableOpacity key={num} onPress={() => setRating(num)}>
                                <MaterialCommunityIcons
                                    name={num <= rating ? "star" : "star-outline"}
                                    size={40}
                                    color={num <= rating ? "#FFD700" : "#aaa"}
                                    style={styles.starIcon}
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.ratingText}>
                        {rating > 0 
                            ? `Tu calificación: ${rating} estrella${rating > 1 ? 's' : ''}`
                            : 'Tocá una estrella para calificar'}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#5C2D91',
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowBack: {
        marginRight: 15,
        padding: 5,
    },
    arrowText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollViewContent: {
        flex: 1,
    },
    content: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    logoImg: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    appInfo: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    version: {
        color: '#666',
        marginBottom: 15,
    },
    legalInfo: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 25,
    },
    section: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#5C2D91',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 22,
    },
    linksContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    linkItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    linkText: {
        fontSize: 15,
        color: '#333',
    },
    ratingContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingVertical: 25,
        marginTop: 15,
    },
    starsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    starIcon: {
        marginHorizontal: 5,
    },
    ratingText: {
        fontSize: 15,
        color: '#444',
        marginTop: 5,
    },
});

export default Acercadenosotro;
