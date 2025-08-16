
import React from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { themes, useTheme } from '../themes';

export default function ThemeScreen() {
  const { themeKey, setThemeKey } = useTheme();

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(themes)}
        keyExtractor={(k) => k}
        renderItem={({ item }) => {
          const t = themes[item];
          const active = item === themeKey;
          return (
            <Pressable onPress={() => setThemeKey(item)} style={[styles.card, active && styles.active]}>
              <Text style={styles.title}>{t.meta.name}</Text>
              <Text style={styles.desc}>{t.meta.description}</Text>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f14', padding: 16 },
  card: { backgroundColor: '#111827', borderRadius: 14, padding: 16 },
  active: { borderColor: '#16a34a', borderWidth: 2 },
  title: { color: 'white', fontSize: 18, fontWeight: '700' },
  desc: { color: '#cbd5e1', marginTop: 4 },
});
