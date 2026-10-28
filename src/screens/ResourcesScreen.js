import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Linking, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme/colors';
import { resources } from '../data/resources';

export default function ResourcesScreen() {
  const call = (phone) => Linking.openURL(`tel:${phone}`);
  const visit = (url) => Linking.openURL(url);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[typography.headlineMedium, styles.textCharcoal]}>Support & resources</Text>
      <View style={{ height: 4 }} />
      <Text style={[typography.bodyLarge, styles.textCharcoal]}>
        You don't have to go through this alone.
      </Text>
      <View style={{ height: 16 }} />

      <FlatList
        data={resources}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[typography.titleLarge, styles.textCharcoal, { fontWeight: '500' }]}>
              {item.name}
            </Text>
            <View style={{ height: 4 }} />
            <Text style={[typography.bodyMedium, styles.textCharcoal]}>{item.description}</Text>
            <View style={{ height: 8 }} />
            <View style={styles.actionsRow}>
              {!!item.phone && (
                <TouchableOpacity onPress={() => call(item.phone)} style={styles.actionButton}>
                  <Text style={styles.actionText}>Call</Text>
                </TouchableOpacity>
              )}
              {!!item.url && (
                <TouchableOpacity onPress={() => visit(item.url)} style={styles.actionButton}>
                  <Text style={styles.actionText}>Visit site</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        ListFooterComponent={
          <>
            <View style={{ height: 8 }} />
            <Text style={[typography.bodyMedium, styles.textCharcoal]}>
              If you're in immediate danger, please call 911 (or your local emergency number).
            </Text>
          </>
        }
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
  card: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  actionButton: {
    paddingVertical: 4,
  },
  actionText: {
    color: colors.deepSage,
    fontWeight: '600',
  },
});
