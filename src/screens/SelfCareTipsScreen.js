import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography } from '../theme/colors';
import { selfCareTips } from '../data/selfCareTips';

export default function SelfCareTipsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[typography.headlineMedium, styles.textCharcoal]}>
        Self-care, one small step at a time
      </Text>
      <View style={{ height: 16 }} />

      <FlatList
        data={selfCareTips}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={[typography.bodyLarge, styles.textCharcoal]}>{item}</Text>
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
});
