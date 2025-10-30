// components/PasswordRequirements.js
import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PasswordRequirements = ({ password = "" }) => {
  // Validaciones individuales
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  // Validación global (opcional)
  const isPasswordValid =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

  const Requirement = ({ label, valid }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
      <MaterialCommunityIcons
        name={valid ? 'check-circle' : 'close-circle'}
        size={18}
        color={valid ? '#C8A2C8BF' : 'gray'}
        style={{ marginRight: 6 }}
      />
      <Text style={{ color: valid ? 'white' : 'gray', fontSize: 14 }}>{label}</Text>
    </View>
  );

  return (
    <View style={{ marginTop: 10 }}>
      <Requirement label="Una letra mayúscula (A–Z)" valid={hasUppercase} />
      <Requirement label="Una letra minúscula (a–z)" valid={hasLowercase} />
      <Requirement label="Un número (0–9)" valid={hasNumber} />
      <Requirement label="Un carácter especial" valid={hasSpecial} />
      <Requirement label="Mínimo 8 caracteres" valid={hasMinLength} />

      {password.length > 0 && (
        <Text
          style={{
            color: isPasswordValid ? 'white' : 'red',
            marginTop: 8,
            fontWeight: 'bold',
            textAlign: 'center',
             textShadowColor: isPasswordValid ? 'transparent' : 'white',
             textShadowOffset: { black: 10, height: 0 },
             textShadowRadius: isPasswordValid ? 0 : 2,
          }}
        >
          {isPasswordValid ? 'Contraseña válida ✅' : 'Contraseña no cumple los requisitos ❌'}
        </Text>
      )}
    </View>
  );
};

export {PasswordRequirements};

