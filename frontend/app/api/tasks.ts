import api from "./axios";
import { Task } from "../types/Task";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (task: Omit<Task, "id">) => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
