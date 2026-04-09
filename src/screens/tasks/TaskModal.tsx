import {
  Modal,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import { useState } from 'react';
import { Calendar } from 'react-native-calendars';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (title: string, date: string) => void;
};

export function CustomModal({ visible, onClose, onAddTask }: Props) {
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  function handleSave() {
    if (!title.trim()) return;
    if (!selectedDate) return;

    onAddTask(title.trim(), selectedDate);
    setTitle('');
    setSelectedDate('');
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Nova atividade</Text>

          <TextInput
            placeholder="Digite a atividade"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Escolha uma data:</Text>

          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={
              selectedDate
                ? {
                    [selectedDate]: {
                      selected: true,
                      selectedColor: 'blue',
                    },
                  }
                : {}
            }
          />

          <Text style={styles.selectedText}>
            Data selecionada: {selectedDate || 'Nenhuma'}
          </Text>

          <View style={styles.buttons}>
            <Button title="Salvar" onPress={handleSave} />
            <Button title="Fechar" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
  },
  selectedText: {
    marginTop: 12,
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    gap: 12,
    padding: 8,
  },
});