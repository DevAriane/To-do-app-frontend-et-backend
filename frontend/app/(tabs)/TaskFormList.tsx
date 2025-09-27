// app/tasks/form.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet ,Image} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTask, updateTask, getTasks } from "../api/tasks";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from '@expo/vector-icons';

export default function TaskFormScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        const all = await getTasks();
        const task = all.find((t) => t.id === Number(id));
        if (task) {
          setTitle(task.title);
          setDescription(task.description ?? "");
        }
      }
    };
    loadTask();
  }, [id]);

  const handleSave = async () => {
    if (id) {
      await updateTask(Number(id), { title, description });
    } else {
      await createTask({ title, description });
    }
    router.push("/TaskListScreen"); // retour à la liste
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📝 Ajouter / Modifier une tâche</Text>


      <View style={styles.inputContainer}>
        <MaterialIcons name="title" size={24} color="#d6336c" style={styles.icon} />
        <TextInput
          placeholder="Titre"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        <Feather name="align-left" size={24} color="#d6336c" style={styles.icon} />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.textArea]}
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Enregistrer ✅</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe0f0', // fond rose clair
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#d6336c',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  button: {
    backgroundColor: '#d6336c',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
