
import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import Tile from './Tile';

export default function Board({ board, selectedId, onTilePress }) {
  const { width } = Dimensions.get('window');
  const scale = Math.min(1, width / 430); // simple responsive scale
  return (
    <View style={styles.container}>
      <View style={{ transform: [{ scale }], width: 430, height: 640 }}>
        {board.tiles.map(tile => (
          <Tile
            key={tile.id}
            tile={tile}
            selected={selectedId === tile.id}
            onPress={() => onTilePress(tile.id)}
          />
        ))}
        {board.remainingPairs === 0 && (
          <View style={styles.winBanner}><Text style={{color:'#fff', fontWeight:'800'}}>🎉 You cleared the board!</Text></View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  winBanner: { position: 'absolute', bottom: 16, left: 16, right: 16, backgroundColor: '#10b981', padding: 16, borderRadius: 12, alignItems: 'center' }
});
