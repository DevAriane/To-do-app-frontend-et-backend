import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { apiWithToken } from '../api';
import { logout } from '../auth';
import { Task } from '../types';

interface Props {
  onLogout: () => void;
}

export default function TaskScreen({ onLogout }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const loadTasks = async () => {
    const api = await apiWithToken();
    const res = await api.get('/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    const api = await apiWithToken();
    await api.post('/tasks', { title });
    setTitle('');
    loadTasks();
  };

  const deleteTask = async (id: number) => {
    const api = await apiWithToken();
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  useEffect(() => { loadTasks(); }, []);

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Button title="Se déconnecter" onPress={async () => { await logout(); onLogout(); }} />
      <TextInput placeholder="Nouvelle tâche" value={title} onChangeText={setTitle} style={{ borderWidth: 1, marginVertical: 10, padding: 5 }} />
      <Button title="Ajouter" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', marginVertical: 10, alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={{ color: 'red' }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
