import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/screens/home/HomeScreen';
import { ListScreen } from './src/screens/tasks/ListScreen';
import { NewTaskScreen } from './src/screens/tasks/NewTaskScreen';
import { ProfileScreen } from './src/screens/profile/ProfileScreen';

export type RootStackParamList = {
  Home: undefined;
  List: undefined;
  Profile: undefined;
  NewTask:
    | {
        taskId?: string;
        title?: string;
        details?: string;
        priority?: 'baixa' | 'media' | 'alta';
      }
    | undefined;
};

export type Task = {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  priority?: 'baixa' | 'media' | 'alta';
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Revisar proposta do projeto',
      subtitle: 'Vence amanha • Projeto X',
      completed: false,
      priority: 'media',
    },
    {
      id: '2',
      title: 'Sincronizacao semanal com o time de design',
      subtitle: 'Hoje, 14:00 • Interno',
      completed: false,
      priority: 'alta',
    },
    {
      id: '3',
      title: 'Comprar graos de cafe',
      subtitle: 'Concluido • Pessoal',
      completed: true,
      priority: 'baixa',
    },
    {
      id: '4',
      title: 'Rascunhar relatorio trimestral',
      subtitle: 'Proxima semana • Financeiro',
      completed: false,
      priority: 'media',
    },
  ]);

  function saveTask(
    title: string,
    details: string,
    priority: 'baixa' | 'media' | 'alta',
    taskId?: string
  ) {
    const priorityLabel = priority.charAt(0).toUpperCase() + priority.slice(1);
    const subtitle = details.trim() || `Prioridade ${priorityLabel}`;

    if (taskId) {
      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === taskId
            ? {
                ...task,
                title: title.trim(),
                subtitle,
                priority,
              }
            : task
        )
      );
      return;
    }

    const newTask: Task = {
      id: String(Date.now()),
      title: title.trim(),
      subtitle,
      completed: false,
      priority,
    };

    setTasks(currentTasks => [newTask, ...currentTasks]);
  }

  function toggleTask(id: string) {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="List">
          {props => (
            <ListScreen
              {...props}
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="NewTask">
          {props => (
            <NewTaskScreen
              {...props}
              onSaveTask={saveTask}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
