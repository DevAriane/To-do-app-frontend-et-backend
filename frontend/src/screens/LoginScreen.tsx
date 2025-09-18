import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { login } from '../auth';

interface Props {
  onLogin: () => void;
  onGoRegister: () => void;
}

export default function LoginScreen({ onLogin, onGoRegister }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      onLogin();
    } catch (e) {
      Alert.alert('Erreur', 'Email ou mot de passe invalide');
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="S'inscrire" onPress={onGoRegister} />
    </View>
  );
}
