import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  StatusBar,
  ActivityIndicator,} from "react-native";
import { useRouter } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/assets/context/AuthContext";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const router = useRouter();
  const { register } = useAuth(); 

  const handleRegister = async () => {
if (!name.trim() || !email.trim() || !password.trim()) {
  Alert.alert("Erreur", "Veuillez remplir tous les champs !");
  return;
}

    setLoadingRegister(true);
    try {
      await register(name, email, password);
      Alert.alert("Succès", "Compte créé avec succès !");
      router.push("/LoginScreen");
    } catch (e) {
      Alert.alert("Erreur", "Impossible de créer le compte");
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleGoLogin = async () => {
    setLoadingLogin(true);
    try {
      // on peut simuler un délai (sinon trop rapide 😅)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/LoginScreen");
    } catch (e) {
      console.error('e',e);
      Alert.alert("Erreur", "Impossible d'aller à la connexion");
    } finally {
      setLoadingLogin(false);
    }
  };


  return (
    <SafeAreaView style={styles.background}>
      <StatusBar style="light" backgroundColor="#fff0f6" />
      <View style={styles.container}>
        <Text style={styles.title}>Créer un compte 🌸</Text>

        <TextInput
          placeholder="Nom"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
          
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loadingRegister}
        >
          {loadingRegister ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>✨ S'inscrire ✨</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={handleGoLogin}
          disabled={loadingLogin}
        >
          {loadingLogin ? (
            <ActivityIndicator size="small" color="#d63384" />
          ) : (
            <Text style={styles.linkText}>J'ai déjà un compte 💌</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#fff0f6",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    padding: 25,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    shadowColor: "#ff80ab",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#d63384",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff0f6",
    padding: 15,
    borderRadius: 30,
    marginVertical: 8,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ffb6c1",
  },
  button: {
    marginTop: 15,
    backgroundColor: "#ff80ab",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 15,
  },
  linkText: {
    color: "#d63384",
    fontSize: 16,
    fontWeight: "500",
  },
});
