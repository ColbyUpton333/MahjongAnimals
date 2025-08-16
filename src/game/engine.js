
import { makeDeckForTheme } from '../themes';
import { GRID } from './layouts';

let idCounter = 1;
function makeId() { return idCounter++; }

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const { TILE_W, TILE_H, DX, DY } = GRID;

function rectsOverlap(a, b) {
  return !(a.x + TILE_W <= b.x || b.x + TILE_W <= a.x || a.y + TILE_H <= b.y || b.y + TILE_H <= a.y);
}

function verticallyOverlaps(a, b) {
  const topA = a.y, bottomA = a.y + TILE_H;
  const topB = b.y, bottomB = b.y + TILE_H;
  return !(bottomA <= topB || bottomB <= topA);
}

function computeFree(board) {
  // For each tile, recompute "free" flag
  for (const tile of board.tiles) {
    if (tile.removed) { tile.free = false; continue; }

    // Blocked from above?
    let blockedTop = false;
    for (const other of board.tiles) {
      if (other.removed) continue;
      if (other.z <= tile.z) continue;
      if (rectsOverlap(tile, other)) { blockedTop = true; break; }
    }
    if (blockedTop) { tile.free = false; continue; }

    // Check left/right on same layer; if both sides blocked, tile is not free
    let leftBlocked = false, rightBlocked = false;
    for (const other of board.tiles) {
      if (other.removed) continue;
      if (other.z !== tile.z) continue;
      if (!verticallyOverlaps(tile, other)) continue;
      if (other.id === tile.id) continue;

      if (other.x < tile.x && (tile.x - other.x) < TILE_W) leftBlocked = true;
      if (other.x > tile.x && (other.x - tile.x) < TILE_W) rightBlocked = true;

      if (leftBlocked && rightBlocked) break;
    }
    tile.free = !(leftBlocked && rightBlocked);
  }
}

export function generateBoard(layoutPoints, theme) {
  idCounter = 1;
  const faces = makeDeckForTheme(theme, layoutPoints.length);
  const shuffledFaces = shuffle(faces);

  const tiles = layoutPoints.map((pt, i) => ({
    id: makeId(),
    x: pt.x,
    y: pt.y,
    z: pt.z,
    face: shuffledFaces[i],
    removed: false,
    free: false
  }));

  const board = { tiles, remainingPairs: Math.floor(tiles.length / 2) };
  computeFree(board);
  return board;
}

export function canMatch(a, b) {
  return a.face.key === b.face.key;
}

export function removePair(board, a, b) {
  const next = deepClone(board);
  const A = next.tiles.find(t => t.id === a.id);
  const B = next.tiles.find(t => t.id === b.id);
  if (!A || !B) return next;
  A.removed = true;
  B.removed = true;
  next.remainingPairs = next.remainingPairs - 1;
  computeFree(next);
  return next;
}

export function findHint(board) {
  const free = board.tiles.filter(t => t.free && !t.removed);
  for (let i = 0; i < free.length; i++) {
    for (let j = i + 1; j < free.length; j++) {
      if (canMatch(free[i], free[j])) return { a: free[i], b: free[j] };
    }
  }
  return null;
}

export function shuffleFreeTiles(board) {
  const next = deepClone(board);
  const freeIdxs = next.tiles
    .map((t, idx) => ({ t, idx }))
    .filter(({ t }) => t.free && !t.removed)
    .map(o => o.idx);

  if (freeIdxs.length < 2) return next;

  const faces = freeIdxs.map(idx => next.tiles[idx].face);
  const shuffled = faces.sort(() => Math.random() - 0.5);
  freeIdxs.forEach((idx, i) => { next.tiles[idx].face = shuffled[i]; });
  computeFree(next);
  return next;
}
