import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { register } from './auth'; // Fonction à créer dans auth.ts

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await register(name,email, password);
      Alert.alert('Succès', 'Compte créé avec succès !');
      router.push('/LoginScreen'); // Redirige vers la page de connexion
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de créer le compte');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
       <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="S'inscrire" onPress={handleRegister} />
      <Button title="J'ai déjà un compte" onPress={() => router.push('/LoginScreen')} />
    </View>
  );
}
