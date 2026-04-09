import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  title: string;
  subtitle: string;
  completed: boolean;
  onToggle: () => void;
  onOpenMenu: () => void;
};

export function TaskItem({
  title,
  subtitle,
  completed,
  onToggle,
  onOpenMenu,
}: Props) {
  return (
    <View style={[styles.container, completed && styles.completedContainer]}>
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.checkbox, completed && styles.checkboxCompleted]}
      >
        {completed && (
          <MaterialIcons name="check" size={18} color="#fff" />
        )}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, completed && styles.completedText]}>
          {title}
        </Text>

        <Text style={[styles.subtitle, completed && styles.completedText]}>
          {subtitle}
        </Text>
      </View>

      <TouchableOpacity onPress={onOpenMenu} style={styles.menuButton}>
        <MaterialIcons name="more-vert" size={20} color="#999" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f1f6',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  completedContainer: {
    backgroundColor: '#E2E0F9',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#bbb',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#8B8CC1',
    borderColor: '#8B8CC1',
  },

  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  menuButton: {
    padding: 4,
  },
});
