// src/contexts/TaskContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/src/api";
import { Alert } from "react-native";

export interface Task {
  id: number;
  title: string;
  description?: string;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  getTasks: () => Promise<void>;
  addTask: (title: string, description?: string) => Promise<void>;
  updateTask: (id: number, title: string, description?: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Charger les tâches au montage
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log("Erreur lors du chargement des tâches :", error);
      Alert.alert("Erreur", "Impossible de charger les tâches.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string, description?: string) => {
    try {
      const res = await api.post("/tasks/create", { title, description });
      setTasks(prev => [...prev, res.data]);
    } catch (error) {
      console.log("Erreur ajout tâche :", error);
      Alert.alert("Erreur", "Impossible d'ajouter la tâche.");
    }
  };

  const updateTask = async (id: number, title: string, description?: string) => {
    try {
      const res = await api.post(`/tasks/${id}/update`, { title, description });
      setTasks(prev => prev.map(task => task.id === id ? res.data : task));
    } catch (error) {
      console.log("Erreur mise à jour tâche :", error);
      Alert.alert("Erreur", "Impossible de mettre à jour la tâche.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await api.post(`/tasks/${id}/delete`);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.log("Erreur suppression tâche :", error);
      Alert.alert("Erreur", "Impossible de supprimer la tâche.");
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, getTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks doit être utilisé dans un TaskProvider");
  return context;
};
