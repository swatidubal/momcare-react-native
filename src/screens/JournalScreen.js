import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme/colors';
import { useMomCare } from '../data/MomCareContext';

export default function JournalScreen() {
  const { journalEntries, addJournalEntry } = useMomCare();
  const [entryText, setEntryText] = useState('');

  const handleSave = () => {
    addJournalEntry(entryText);
    setEntryText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[typography.headlineMedium, styles.textCharcoal]}>Your journal</Text>
      <View style={{ height: 4 }} />
      <Text style={[typography.bodyMedium, styles.textCharcoal]}>
        A private space just for you.
      </Text>
      <View style={{ height: 16 }} />

      <TextInput
        value={entryText}
        onChangeText={setEntryText}
        placeholder="What's on your mind today?"
        placeholderTextColor="#9A8F86"
        multiline
        style={styles.textArea}
      />
      <View style={{ height: 8 }} />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save entry</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <FlatList
        data={journalEntries}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[typography.bodyMedium, styles.textCharcoal]}>{item.date}</Text>
            <View style={{ height: 4 }} />
            <Text style={[typography.bodyLarge, styles.textCharcoal]}>{item.text}</Text>
          </View>
        )}
      />
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
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textCharcoal,
    backgroundColor: colors.surface,
    height: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.warmRose,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  saveButtonText: {
    color: colors.textCharcoal,
    fontWeight: '600',
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
