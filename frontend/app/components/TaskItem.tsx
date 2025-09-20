import React from "react";
import { View, Text, Button } from "react-native";
import { Task } from "../types/Task";

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onEdit }: Props) {
  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontWeight: "bold" }}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Button title="Modifier" onPress={() => onEdit(task)} />
      <Button title="Supprimer" onPress={() => onDelete(task.id)} />
    </View>
  );
}
