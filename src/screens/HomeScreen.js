
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mahjong Animals</Text>
      <Text style={styles.subtitle}>Match all tiles to clear the board.</Text>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('Game', { layout: 'turtle' })}>
        <Text style={styles.btnText}>Play - Turtle Layout</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() => navigation.navigate('Game', { layout: 'dragon' })}>
        <Text style={styles.btnText}>Play - Dragon Layout</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={() => navigation.navigate('Game', { layout: 'bridge' })}>
        <Text style={styles.btnText}>Play - Bridge Layout</Text>
      </Pressable>

      <View style={{ height: 16 }} />

      <Pressable style={[styles.btn, styles.secondary]} onPress={() => navigation.navigate('Themes')}>
        <Text style={styles.btnText}>Themes</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.secondary]} onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.btnText}>Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f14', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: 'white', fontSize: 28, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#cbd5e1', marginBottom: 24 },
  btn: { backgroundColor: '#16a34a', paddingVertical: 14, paddingHorizontal: 18, borderRadius: 14, marginVertical: 6, minWidth: '70%', alignItems: 'center' },
  secondary: { backgroundColor: '#1f2937' },
  btnText: { color: 'white', fontWeight: '700' },
});
