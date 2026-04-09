import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { AppInput } from '../../components/ui/AppInput';

type Priority = 'baixa' | 'media' | 'alta';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTask'> & {
  onSaveTask: (
    title: string,
    details: string,
    priority: Priority,
    taskId?: string
  ) => void;
};

export function NewTaskScreen({
  navigation,
  route,
  onSaveTask,
}: Props) {
  const taskId = route.params?.taskId;
  const [priority, setPriority] = useState<Priority>(route.params?.priority ?? 'media');
  const [title, setTitle] = useState(route.params?.title ?? '');
  const [details, setDetails] = useState(route.params?.details ?? '');

  function handleSaveTask() {
    if (!title.trim()) {
      return;
    }

    onSaveTask(title, details, priority, taskId);
    navigation.navigate('List');
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <MaterialIcons name="arrow-back" size={24} color="#5F666D" />
        </TouchableOpacity>

        <Text style={styles.textheader}>
          {taskId ? 'Editar tarefa' : 'Nova tarefa'}
        </Text>

        <View style={styles.headerSpacer} />
      </View>
      <Text style={styles.eyebrow}>{taskId ? 'Ajuste' : 'Curadoria'}</Text>
      <Text style={styles.title}>
        {taskId ? 'Atualize sua atividade.' : 'Capture seu proximo avanço.'}
      </Text>

      <View style={styles.form}>
        <AppInput
          label="Titulo da Tarefa"
          placeholder="Ex.: Finalizar apresentacao"
          value={title}
          onChangeText={setTitle}
        />
        <AppInput
          style={styles.input}
          label="Detalhes e Notas"
          multiline
          textAlignVertical="top"
          value={details}
          onChangeText={setDetails}
        />

        <View style={styles.prioritySection}>
          <Text style={styles.priorityLabel}>Prioridade</Text>

          <View style={styles.priorityRow}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'baixa' && styles.priorityButtonLow,
              ]}
              onPress={() => setPriority('baixa')}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === 'baixa' && styles.priorityTextActive,
                ]}
              >
                Baixa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'media' && styles.priorityButtonMedium,
              ]}
              onPress={() => setPriority('media')}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === 'media' && styles.priorityTextActive,
                ]}
              >
                Media
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'alta' && styles.priorityButtonHigh,
              ]}
              onPress={() => setPriority('alta')}
            >
              <Text
                style={[
                  styles.priorityText,
                  priority === 'alta' && styles.priorityTextActive,
                ]}
              >
                Alta
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
          <MaterialIcons name="check-circle" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>
            {taskId ? 'Atualizar Tarefa' : 'Salvar Tarefa'}
          </Text>
        </TouchableOpacity>
      </View>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textheader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  eyebrow: {
    fontSize: 14,
    color: '#5F666D',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#111',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
    gap: 28,
  },
  input: {
    height: 120,
  },
  prioritySection: {
    gap: 10,
  },
  priorityLabel: {
    fontSize: 14,
    color: '#2E2A35',
    fontWeight: '400',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: '#e2ddfcff',
    borderWidth: 1,
    borderColor: '#E2DDEA',
    alignItems: 'center',
  },
  priorityButtonLow: {
    backgroundColor: '#DFF5E8',
  
  },
  priorityButtonMedium: {
    backgroundColor: '#FFF0CC',
  
  },
  priorityButtonHigh: {
    backgroundColor: '#FFD9D9',
 
  },
  priorityText: {
    fontSize: 15,
    color: '#4E4859',
    fontWeight: '500',
  },
  priorityTextActive: {
    color: '#111',
    fontWeight: '700',
  },
  footer: {
    padding: 20,
    marginTop: 'auto',
  },
  saveButton: {
    backgroundColor:  '#7173A5',
    borderRadius: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
