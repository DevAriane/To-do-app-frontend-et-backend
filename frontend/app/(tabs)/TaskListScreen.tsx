import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Task } from "../types/Task";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import EvilIcons from '@expo/vector-icons/EvilIcons';

// interface Props {
//   task: Task;
//   onDelete: (id: number) => void;
//   onEdit: (task: Task) => void;
// }

export default function TaskItem() {

  return (
    <SafeAreaView>
   <StatusBar backgroundColor="#ffe0f0" />
      <View style={styles.header}>
        <Text style={{color:"#d6336c",fontSize:20,fontWeight:'900'}}>Liste des taches</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin:10}}>
     <TouchableOpacity  style={styles.card}>
      <TouchableOpacity onPress={()=>router.push('/details')}>
      <EvilIcons name="eye" size={30} color="black" /></TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ranger les habits</Text>
      </View>

      <View style={styles.iconsContainer}>
        <TouchableOpacity  style={styles.iconButton}>
          <Feather name="edit-2" size={22} color="#4a148c" />
    </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="delete" size={24} color="#c62828" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
    textAlign:"center",
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
  header:{
    width:'100%',
    height:70,
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:'#ffe0f0',
  },
});
