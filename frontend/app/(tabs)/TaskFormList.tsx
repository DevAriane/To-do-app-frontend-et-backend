// app/tasks/form.tsx
import React, { useEffect, useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createTask, updateTask, getTasks } from "../api/tasks";
import { Task } from "../types/Task";

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
    <View>
      <TextInput
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Enregistrer" onPress={handleSave} />
    </View>
  );
}
