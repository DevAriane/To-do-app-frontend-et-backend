import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfilePage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
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
        <Text style={styles.name}>Ariane</Text>
        <Text style={styles.email}>ariane@example.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/tasks")}>
          <Feather name="list" size={20} color="#d6336c" />
          <Text style={styles.menuText}>Mes Tâches</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Feather name="settings" size={20} color="#d6336c" />
          <Text style={styles.menuText}>Paramètres</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
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
    color: "#555",
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
