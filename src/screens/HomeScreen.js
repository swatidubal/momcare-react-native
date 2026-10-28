import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme/colors';
import { useMomCare } from '../data/MomCareContext';

const moods = [
  { emoji: '😊', label: 'Good' },
  { emoji: '😐', label: 'Okay' },
  { emoji: '😔', label: 'Low' },
  { emoji: '😴', label: 'Exhausted' },
  { emoji: '😤', label: 'Overwhelmed' },
];

export default function HomeScreen() {
  const { moodEntries, addMood } = useMomCare();
  const [note, setNote] = useState('');

  const handleMoodPress = (label) => {
    addMood(label, note);
    setNote('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[typography.headlineMedium, styles.textCharcoal]}>Hi, mama 🌸</Text>
      <View style={{ height: 4 }} />
      <Text style={[typography.bodyLarge, styles.textCharcoal]}>
        How are you feeling today?
      </Text>
      <View style={{ height: 16 }} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.moodRow}>
          {moods.map(({ emoji, label }) => (
            <View key={label} style={styles.moodItem}>
              <TouchableOpacity style={styles.moodButton} onPress={() => handleMoodPress(label)}>
                <Text style={styles.moodEmoji}>{emoji}</Text>
              </TouchableOpacity>
              <View style={{ height: 4 }} />
              <Text style={[typography.bodyMedium, styles.textCharcoal]}>{label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ height: 20 }} />

      <TextInput
        value={note}
        onChangeText={setNote}
        placeholder="Optional note (what's on your mind?)"
        placeholderTextColor="#9A8F86"
        style={styles.textField}
      />

      <View style={{ height: 24 }} />
      <Text style={[typography.titleLarge, styles.textCharcoal]}>Recent check-ins</Text>
      <View style={{ height: 8 }} />

      {moodEntries.length === 0 ? (
        <Text style={[typography.bodyMedium, styles.textCharcoal]}>
          Your mood history will show up here.
        </Text>
      ) : (
        <FlatList
          data={moodEntries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={[typography.bodyLarge, styles.textCharcoal]}>
                {item.date} — {item.mood}
              </Text>
              {!!item.note && (
                <Text style={[typography.bodyMedium, styles.textCharcoal, { marginTop: 4 }]}>
                  {item.note}
                </Text>
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  textCharcoal: {
    color: colors.textCharcoal,
  },
  moodRow: {
    flexDirection: 'row',
    gap: 16,
  },
  moodItem: {
    alignItems: 'center',
  },
  moodButton: {
    backgroundColor: colors.warmRose,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  moodEmoji: {
    fontSize: 22,
  },
  textField: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textCharcoal,
    backgroundColor: colors.surface,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
});
