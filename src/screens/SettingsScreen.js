
import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [hints, setHints] = useState(true);
  const [sounds, setSounds] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Enable Hints</Text>
        <Switch value={hints} onValueChange={setHints} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sounds</Text>
        <Switch value={sounds} onValueChange={setSounds} />
      </View>
      <Text style={styles.note}>
        Note: Sounds are placeholder; add your own SFX in /assets and wire them up via expo-av.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f14', padding: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827', marginBottom: 12, padding: 14, borderRadius: 12 },
  label: { color: 'white', fontSize: 16, fontWeight: '600' },
  note: { color: '#9ca3af', marginTop: 8 },
});
