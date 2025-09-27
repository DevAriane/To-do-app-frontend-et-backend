import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from "../types/Task";
import { Feather, MaterialIcons } from "@expo/vector-icons";

// interface Props {
//   task: Task;
//   onDelete: (id: number) => void;
//   onEdit: (task: Task) => void;
// }

export default function TaskItem() {

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>task.title</Text>
        
          <Text style={styles.description}>ask.description</Text>
        
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity  style={styles.iconButton}>
          <Feather name="edit-2" size={22} color="#4a148c" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color="#c62828" />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
  },
});
