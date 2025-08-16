
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

export default function Tile({ tile, selected, onPress }) {
  if (tile.removed) return null;

  const shadowOffset = tile.z * 2;
  const isFree = tile.free;
  const color = selected ? '#22c55e' : isFree ? '#111827' : '#18212f';

  return (
    <View
      style={[styles.wrapper, {
        left: tile.x,
        top: tile.y,
        zIndex: 100 + tile.z,
      }]}
      pointerEvents="box-none"
    >
      <Pressable
        onPress={onPress}
        disabled={!isFree}
        style={[styles.tile, { backgroundColor: color, borderColor: selected ? '#22c55e' : '#334155', shadowColor: '#000', shadowOffset: { width: shadowOffset, height: shadowOffset }, shadowOpacity: 0.3, shadowRadius: 4 }]}
      >
        <Text style={[styles.face, { color: '#e5e7eb' }]}>{tile.face.emoji} {tile.face.label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { position: 'absolute' },
  tile: { width: 72, height: 96, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  face: { fontSize: 18, fontWeight: '800', textAlign: 'center', paddingHorizontal: 6 },
});
