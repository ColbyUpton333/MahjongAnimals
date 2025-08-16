
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import Board from '../components/Board';
import HUD from '../components/HUD';
import { generateBoard, canMatch, removePair, findHint, shuffleFreeTiles } from '../game/engine';
import { getLayout } from '../game/layouts';
import { useTheme } from '../themes';

export default function GameScreen({ route, navigation }) {
  const layoutKey = route.params?.layout || 'turtle';
  const { theme } = useTheme();
  const [board, setBoard] = useState(null);
  const [selected, setSelected] = useState(null);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    reset();
    timerRef.current = setInterval(() => setElapsed(Date.now() - startTime), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  function reset() {
    const layout = getLayout(layoutKey);
    const newBoard = generateBoard(layout, theme);
    setBoard(newBoard);
    setSelected(null);
    setMoves(0);
    setStartTime(Date.now());
  }

  function onTilePress(tileId) {
    if (!board) return;
    const tile = board.tiles.find(t => t.id === tileId);
    if (!tile || tile.removed || !tile.free) return;

    if (!selected) {
      setSelected(tile);
      return;
    }

    if (selected.id === tile.id) {
      setSelected(null);
      return;
    }

    if (canMatch(selected, tile)) {
      const next = removePair(board, selected, tile);
      setBoard(next);
      setSelected(null);
      setMoves(m => m + 1);

      if (next.remainingPairs === 0) {
        const seconds = Math.round((Date.now() - startTime) / 1000);
        Alert.alert('You win!', `Cleared in ${seconds}s and ${moves+1} moves.`);
      }
    } else {
      setSelected(tile);
    }
  }

  function onHint() {
    const hint = findHint(board);
    if (!hint) {
      Alert.alert('No moves', 'No available matches. Try shuffling free tiles.');
    } else {
      Alert.alert('Hint', `Try matching tiles: ${hint.a.face.label} ↔ ${hint.b.face.label}`);
      setSelected(hint.a);
      setTimeout(() => setSelected(hint.b), 150);
    }
  }

  function onShuffle() {
    const next = shuffleFreeTiles(board);
    setBoard(next);
  }

  if (!board) return <View style={{flex:1, backgroundColor:'#0b0f14'}} />;

  return (
    <View style={styles.container}>
      <HUD moves={moves} elapsedMs={elapsed} onReset={reset} onHint={onHint} onShuffle={onShuffle} />
      <Board board={board} selectedId={selected?.id} onTilePress={onTilePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0f14', paddingTop: 6 },
});
