import {
  Modal,
  Pressable,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../../../App';
import { Menu } from '../../components/ui/Menu';
import { useMemo, useState } from 'react';
import { TaskItem } from '../../components/tasks/TaskItem';

type Props = NativeStackScreenProps<RootStackParamList, 'List'> & {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

type FilterType = 'tasks' | 'todo' | 'done';

export function ListScreen({ tasks, onToggleTask, onDeleteTask, navigation }: Props) {
  const [active, setActive] = useState<FilterType>('tasks');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  function handleTaskMenu(task: Task) {
    setSelectedTask(task);
  }

  function handleEditTask() {
    if (!selectedTask) {
      return;
    }

    navigation.navigate('NewTask', {
      taskId: selectedTask.id,
      title: selectedTask.title,
      details: selectedTask.subtitle,
      priority: selectedTask.priority ?? 'media',
    });
    setSelectedTask(null);
  }

  function handleDeleteTask() {
    if (!selectedTask) {
      return;
    }

    onDeleteTask(selectedTask.id);
    setSelectedTask(null);
  }

  const filteredTasks = useMemo(() => {
    if (active === 'todo') {
      return tasks.filter(task => !task.completed);
    }

    if (active === 'done') {
      return tasks.filter(task => task.completed);
    }

    return tasks;
  }, [active, tasks]);

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.text}>TaskMind</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            accessibilityRole="button"
            accessibilityLabel="Abrir perfil"
            style={styles.avatarButton}
          >
            <Image
              source={require('../../assets/pessoaandrew.jpg')}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.titles}>
          <Text style={styles.subtitle}>VISÃO GERAL</Text>
          <Text style={styles.title}>Minhas Tarefas</Text>
        </View>

        <View style={styles.container2}>
          <View style={styles.card1}>
            <Text style={styles.cardNumberDark}>{activeCount}</Text>
            <Text>Tarefas Ativas</Text>
          </View>

          <View style={styles.card2}>
            <Text style={styles.cardNumberLight}>{progress}%</Text>
            <Text style={styles.cardTextLight}>Progresso Semanal</Text>
          </View>
        </View>

        <View style={styles.container3}>
          <TouchableOpacity
            style={[styles.filter, active === 'tasks' && styles.filterActive]}
            onPress={() => setActive('tasks')}
          >
            <Text
              style={[
                styles.filterText,
                active === 'tasks' && styles.filterTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filter, active === 'todo' && styles.filterActive]}
            onPress={() => setActive('todo')}
          >
            <Text
              style={[
                styles.filterText,
                active === 'todo' && styles.filterTextActive,
              ]}
            >
              A Fazer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filter, active === 'done' && styles.filterActive]}
            onPress={() => setActive('done')}
          >
            <Text
              style={[
                styles.filterText,
                active === 'done' && styles.filterTextActive,
              ]}
            >
              Concluídas
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskList}>
          {filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              title={task.title}
              subtitle={task.subtitle}
              completed={task.completed}
              onToggle={() => onToggleTask(task.id)}
              onOpenMenu={() => handleTaskMenu(task)}
            />
          ))}

          {filteredTasks.length === 0 && (
            <Text style={styles.emptyText}>Nenhuma tarefa nesta categoria.</Text>
          )}
        </View>

        <View style={styles.cardidea}>
          <View style={{ alignItems: 'center', gap: 6 }}>
            <MaterialIcons name="light-mode" size={26} color="#414271" />
             <Text style={{fontSize:22,fontWeight: "bold", textAlign: 'center' }}>Mantenha o foco, alcance mais!</Text>
          </View>
      </View>
      </ScrollView>
 
      

      <Menu />

      <Modal
        visible={selectedTask !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTask(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setSelectedTask(null)}
        >
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {selectedTask?.title }
            </Text>
            <Text style={styles.modalSubtitle}>Escolha o que deseja fazer.</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleEditTask}>
              <MaterialIcons name="edit" size={18} color="#111" />
              <Text style={styles.modalButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDeleteTask}
            >
              <MaterialIcons name="delete-outline" size={18} color="#C44747" />
              <Text style={styles.modalDeleteText}>Excluir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setSelectedTask(null)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 120,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  avatarButton: {
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E6E0F7',
    padding: 2,
  },
  titles: {
    padding: 20,
  },
  subtitle: {
    fontSize: 12,
    color: '#5F666D',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  card1: {
    borderRadius: 20,
    paddingTop: 65,
    padding: 10,
    backgroundColor:"#E2E0F9",
    width: 150,
    height: 150,
  },
  card2: {
    borderRadius: 20,
    paddingTop: 65,
    padding: 10,
    backgroundColor: '#7173A5',
    width: 150,
    height: 150,
  },
  cardNumberDark: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  cardNumberLight: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardTextLight: {
    fontSize: 14,
    color: '#fff',
  },
  container3: {
    paddingTop: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  filter: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#dad8e9ff',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterActive: {
    backgroundColor: '#7173A5',
  },
  filterText: {
    color: '#000',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  taskList: {
    paddingHorizontal: 16,
    paddingTop: 18,
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
    marginBottom: 28,
  },
  cardidea: {
    
      textAlign: 'center',
      width: '90%',
      alignSelf: 'center',
      backgroundColor: "#E2E0F9" ,
      borderRadius: 20,
      marginTop: 12,
      padding: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(17, 17, 17, 0.35)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6C6677',
    marginBottom: 6,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F1F7',
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  modalDeleteText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#C44747',
  },
  modalCancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  modalCancelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C6677',
  },

});
