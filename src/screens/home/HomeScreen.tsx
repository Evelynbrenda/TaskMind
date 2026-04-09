import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.textcard}>
        <Text style={styles.titulo2}>SEU ASSISTENTE PESSOAL</Text>
        <Text style={styles.titulo}>Bem vindo ao TaskMind!</Text>
        <Text style={styles.titulo3}>
          Domine sua produtividade com uma abordagem curada para o gerenciamento
          de tarefas. Organize seu dia com clareza e intenção.
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('List')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Começar</Text>
        <MaterialIcons name="east" size={24} color="#fff" />
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  textcard: {
    padding: 20,
    gap: 8,
    margin: 18,
  },
  titulo2: {
    fontSize: 12,
    color: '#5F666D',
  },
  titulo3: {
    fontSize: 18,
    color: '#5F666D',
    lineHeight: 28,
  },
  titulo: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: "#7173A5",
    padding: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 280,
    gap: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
