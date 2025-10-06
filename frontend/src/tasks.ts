import api from "./api";
import { Task } from "./types";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (title:string,description:string) => {
  const res = await api.post("/tasks", {title,description});
  return res.data;
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
