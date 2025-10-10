import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { getTasks } from "@/src/tasks"; // ta fonction API pour récupérer les tâches
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";

export default function TaskItem() {
  const [tasks, setTasks] = useState([]); // liste des tâches
  const [loading, setLoading] = useState(true);

  // Récupérer les tâches au montage du composant
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(); // récupère les tâches de l’utilisateur connecté
        console.log("data", data);  
        setTasks(data);
      } catch (error) {
        console.error("Erreur lors du chargement des tâches :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#d6336c" />
        <Text>Chargement des tâches...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#ffe0f0" />
      <View style={styles.header}>
        <Text style={{ color: "#d6336c", fontSize: 20, fontWeight: "900" }}>Liste des tâches</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 10 }}>
        {tasks.length === 0 ? (
          <Text style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
            Aucune tâche trouvée.
          </Text>
        ) : (
          tasks.map((task) => (
            <TouchableOpacity key={task.id} style={styles.card}>
              <TouchableOpacity onPress={() => router.push(`/details/${task.id}`)}>
                <EvilIcons name="eye" size={30} color="black" />
              </TouchableOpacity>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.description}>{task.description}</Text>
              </View>

              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.iconButton}>
                  <Feather name="edit-2" size={22} color="#4a148c" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                  <MaterialIcons name="delete" size={24} color="#c62828" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d6336c",
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
  header: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe0f0",
  },
});
