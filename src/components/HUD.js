
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HUD({ moves, elapsedMs, onReset, onHint, onShuffle }) {
  const seconds = Math.floor(elapsedMs / 1000);
  const mm = String(Math.floor(seconds / 60)).padStart(2,'0');
  const ss = String(seconds % 60).padStart(2,'0');

  return (
    <View style={styles.bar}>
      <Text style={styles.stat}>⏱ {mm}:{ss}</Text>
      <Text style={styles.stat}>🧠 {moves} moves</Text>
      <View style={styles.actions}>
        <Pressable style={[styles.btn, styles.secondary]} onPress={onHint}><Text style={styles.btnText}>Hint</Text></Pressable>
        <Pressable style={[styles.btn, styles.secondary]} onPress={onShuffle}><Text style={styles.btnText}>Shuffle</Text></Pressable>
        <Pressable style={styles.btn} onPress={onReset}><Text style={styles.btnText}>Restart</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8 },
  stat: { color: '#e5e7eb', fontWeight: '700' },
  actions: { flexDirection: 'row' },
  btn: { backgroundColor: '#16a34a', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, marginLeft: 8 },
  secondary: { backgroundColor: '#1f2937' },
  btnText: { color: 'white', fontWeight: '700' }
});
