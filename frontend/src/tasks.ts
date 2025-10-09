import api from "./api";
import { Task } from "./types";

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const createTask = async (title:string,description:string) => {
  try {
    const res = await api.post("/tasks/create", {title,description,  user_id: currentUser.id});
  return res.data;
  } catch (error:any) {
         if (error.response) {
    console.log("🚨 Erreur Laravel complète :", error.response.data);

    const backendError =
      error.response.data?.message ||
      JSON.stringify(error.response.data?.errors) ||
      "Erreur côté serveur Laravel";

    throw new Error(backendError);
  } else if (error.request) {
    // Requête envoyée, mais pas de réponse du serveur
    console.log("🚨 Aucun retour de Laravel :", error.request);
    throw new Error("Impossible de joindre le serveur Laravel");
  } else {
    // Erreur avant même l’envoi de la requête (configuration, etc.)
    console.log("🚨 Erreur inattendue :", error.message);
    throw new Error("Erreur interne dans l'application");
  }
  }
  
};

export const updateTask = async (id: number, task: Partial<Task>) => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: number) => {
  await api.delete(`/tasks/${id}`);
};
