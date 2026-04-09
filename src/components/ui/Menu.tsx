import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export function Menu() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const active: 'tasks' | 'add' | 'profile' =
    route.name === 'NewTask'
      ? 'add'
      : route.name === 'Profile'
        ? 'profile'
        : 'tasks';

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        onPress={() => navigation.navigate('List')}
        style={[styles.menuItem, active === 'tasks' && styles.menuItemActive]}
      >
        <View style={[styles.iconContainer, active === 'tasks' && styles.active]}>
          <MaterialIcons
            name="checklist"
            size={24}
            color={active === 'tasks' ? '#fff' : '#888'}
          />
        </View>
        <Text style={[styles.label, active === 'tasks' && styles.labelActive]}>
          Tarefas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('NewTask')}
        style={[styles.menuItem, active === 'add' && styles.menuItemActive]}
      >
        <View style={[styles.iconContainer, active === 'add' && styles.active]}>
          <MaterialIcons
            name="add"
            size={24}
            color={active === 'add' ? '#fff' : '#888'}
          />
        </View>
        <Text style={[styles.label, active === 'add' && styles.labelActive]}>
          Nova
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={[styles.menuItem, active === 'profile' && styles.menuItemActive]}
      >
        <View style={[styles.iconContainer, active === 'profile' && styles.active]}>
          <MaterialIcons
            name="person"
            size={24}
            color={active === 'profile' ? '#fff' : '#888'}
          />
        </View>
        <Text style={[styles.label, active === 'profile' && styles.labelActive]}>
          Perfil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 28,
    shadowColor: '#1A132F',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    elevation: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 6,
    borderRadius: 20,
  },
  menuItemActive: {
    backgroundColor: '#F3F0FF',
  },
  iconContainer: {
    padding: 12,
    borderRadius: 50,
  },
  active: {
    backgroundColor: '#7173A5',
  },
  label: {
    fontSize: 12,
    color: '#7A7488',
    fontWeight: '600',
  },
  labelActive: {
    color: '#7173A5',
  },
});
