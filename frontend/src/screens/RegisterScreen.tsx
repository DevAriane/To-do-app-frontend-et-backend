import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { register } from '../auth';

interface Props {
  onRegister: () => void;
  onGoLogin: () => void;
}

export default function RegisterScreen({ onRegister, onGoLogin }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      onRegister();
    } catch (e) {
      Alert.alert('Erreur', 'Impossible de créer le compte');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <TextInput placeholder="Nom" value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Button title="S'inscrire" onPress={handleRegister} />
      <Button title="Retour à la connexion" onPress={onGoLogin} />
    </View>
  );
}
