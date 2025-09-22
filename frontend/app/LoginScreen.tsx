import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      await AsyncStorage.setItem("token", res.data.token);
      router.replace("/TaskListScreen");
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar backgroundColor=" #fff0f6"/>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/4825/4825038.png",
          }}
          style={styles.logo}
        />

        <Text style={styles.title}>Bienvenue 💖</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>✨ Se connecter ✨</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.but} onPress={()=>{router.push('/RegisterScreen')}}>
          <Text style={styles.buttonText}> Creer un compte</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area:{
    flex:1,
  backgroundColor: "#fff0f6",

},
  background: { backgroundColor: "#fff0f6",

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    padding: 25,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    alignItems: "center",
    shadowColor: "#ff80ab",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 15,
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
    marginVertical: 10,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ffb6c1",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#ff80ab",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    width: "100%",
  },
   but: {
    marginTop: 20,
   color: "#d63384",
    backgroundColor: "#fff0f6",
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
});
