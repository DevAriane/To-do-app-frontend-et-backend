import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserData} from "@/src/auth"; 
import React, { useEffect, useState } from "react"; 
import api from "@/src/api";

export default function ProfilePage() {
const handleLogout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('userData');
  router.replace('/LoginScreen'); // redirige vers l’écran de connexion
};
 const [user, setUser] = useState<any>(null);

  useEffect(() => {
        const fetchUser = async () => {
      const token = await AsyncStorage.getItem("token");
      console.log("token :::", token);

      if (!token) return;

      try {
        const res = await api.get("/user"); // ta route protégée Laravel
        console.log("userData :", res.data);
        setUser(res.data);
      } catch (e) {
        console.error("Erreur récupération user", e);
      }
    };
    fetchUser();
  }, []);

console.log('userData dans profil.tsx :', user);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="#ffb6c1" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Mon Profil</Text>
      </View>

      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://randomuser.me/api/portraits/women/68.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>ariane@example.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/TaskListScreen')}>
          <Feather name="list" size={20} color="#d6336c" />
          <Text style={styles.menuText}>Mes Tâches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="settings" size={20} color="#d6336c" />
          <Text style={styles.menuText}>Paramètres</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={()=>handleLogout()}>
          <Feather name="log-out" size={20} color="#d6336c" />
          <Text style={styles.menuText}>Se Déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffe0f0", // fond rose
  },
  header: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffb6c1", // header rose foncé
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#d6336c",
  },
  email: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  menu: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#d6336c",
  },
});
