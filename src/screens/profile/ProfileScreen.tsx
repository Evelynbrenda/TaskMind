import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const tips = [
  'Defina 3 prioridades reais para o dia.',
  'Use blocos de foco de 25 minutos para tarefas importantes.',
  'Evite alternar entre muitas atividades ao mesmo tempo.',
];

export function ProfileScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <MaterialIcons name="arrow-back" size={24} color="#2F2B3A" />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.badge}>
            <MaterialIcons name="verified-user" size={16} color="#5B4BC4" />
            <Text style={styles.badgeText}>Perfil ativo</Text>
          </View>

          <Image
            source={require('../../assets/pessoaandrew.jpg')}
            style={styles.avatar}
          />

          <Text style={styles.title}>Ola, Dev!</Text>
          <Text style={styles.subtitle}>
            Seu espaco para acompanhar consistencia, progresso e pequenos ganhos da semana.
          </Text>

          <View style={styles.highlightRow}>
            <View style={styles.highlightPill}>
              <MaterialIcons name="bolt" size={16} color="#5B4BC4" />
              <Text style={styles.highlightText}>Semana produtiva</Text>
            </View>
            <View style={styles.highlightPill}>
              <MaterialIcons name="check-circle" size={16} color="#2F9E69" />
              <Text style={styles.highlightText}>Bom ritmo</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>RESUMO</Text>
          <Text style={styles.sectionTitle}>Seu desempenho recente</Text>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.statCardPrimary]}>
              <View style={styles.statIconWrap}>
                <MaterialIcons name="pending-actions" size={18} color="#fff" />
              </View>
              <Text style={styles.statNumberPrimary}>75%</Text>
              <Text style={styles.statTitlePrimary}>Em andamento</Text>
              <Text style={styles.statTextPrimary}>
                Voce manteve constancia nas tarefas mais importantes.
              </Text>
            </View>

            <View style={styles.statCard}>
              <View style={[styles.statIconWrap, styles.statIconSoft]}>
                <MaterialIcons name="task-alt" size={18} color="#5B4BC4" />
              </View>
              <Text style={styles.statNumber}>50%</Text>
              <Text style={styles.statTitle}>Concluidas</Text>
              <Text style={styles.statText}>
                Metade da meta semanal ja foi finalizada com sucesso.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>FOCO</Text>
          <Text style={styles.sectionTitle}>Dicas para manter a produtividade</Text>

          <View style={styles.tipsCard}>
            {tips.map((tip, index) => (
              <View key={tip} style={styles.tipRow}>
                <View style={styles.tipIndex}>
                  <Text style={styles.tipIndexText}>0{index + 1}</Text>
                </View>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingTop: 88,
    paddingBottom: 36,
    gap: 22,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  heroCard: {
    marginHorizontal: 20,
    paddingHorizontal: 22,
    paddingVertical: 24,
    borderRadius: 28,
    backgroundColor: '#dad8e9ff',
    alignItems: 'center',
    gap: 14,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFFB8',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#5B4BC4',
  },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 4,
    borderColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#211C2B',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5F666D',
    textAlign: 'center',
    maxWidth: 280,
  },
  highlightRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  highlightPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF8F2',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  highlightText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2F2B3A',
  },
  section: {
    paddingHorizontal: 20,
    gap: 12,
  },
  sectionLabel: {
    fontSize: 12,
    letterSpacing: 1.2,
    color: '#7A7288',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#211C2B',
  },
  statsGrid: {
    gap: 12,
  },
  statCard: {
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#dad8e9ff',
  },
  statCardPrimary: {
    backgroundColor:  '#7173A5',
  },
  statIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#A6A7DD",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  statIconSoft: {
    backgroundColor: '#EEEAFE',
  },
  statNumberPrimary: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
  },
  statTitlePrimary: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginTop: 4,
  },
  statTextPrimary: {
    fontSize: 14,
    lineHeight: 20,
    color: '#E9E4FF',
    marginTop: 8,
  },
  statNumber: {
    fontSize: 34,
    fontWeight: '800',
    color: '#211C2B',
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#211C2B',
    marginTop: 4,
  },
  statText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6A6477',
    marginTop: 8,
  },
  tipsCard: {
    backgroundColor: '#FFFDF9',
    borderRadius: 24,
    padding: 18,
    gap: 14,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipIndex: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FFEBFD",
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipIndexText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#595A8B',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#4F485D',
    paddingTop: 6,
  },
});
