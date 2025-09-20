// app/tasks/index.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, Button } from "react-native";
import { Task } from "../types/Task";
import { getTasks, deleteTask } from "../api/tasks";
import TaskItem from "../components/TaskItem";
import { useRouter } from "expo-router";

export default function TaskListScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteTask(id);
    loadTasks();
  };

  return (
    <View>
      <Button
        title="Ajouter une tâche"
        onPress={() => router.push('/TaskFormList')}
      />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={handleDelete}
            onEdit={(t) =>
              router.push({ pathname:'/TaskFormList', params: { id: t.id } })
            }
          />
        )}
      />
    </View>
  );
}
