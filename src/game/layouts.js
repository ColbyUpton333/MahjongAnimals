
/**
 * Simplified Mahjong Solitaire layouts tuned for 144 tiles.
 * Coordinate system is a 430x640 canvas. Tiles are 72x96 px.
 */
const TILE_W = 72;
const TILE_H = 96;
const X0 = 20;
const Y0 = 20;
const DX = 50; // horizontal step
const DY = 40; // vertical step

function rectGrid(rows, cols, z = 0, xOffset = 0, yOffset = 0) {
  const out = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      out.push({ x: X0 + xOffset + c * DX, y: Y0 + yOffset + r * DY, z });
    }
  }
  return out;
}

function turtleLayout() {
  let pts = [];
  pts = pts.concat(rectGrid(8,12,0,0,0));
  pts = pts.concat(rectGrid(6,10,1,20,20));
  pts = pts.concat(rectGrid(4,8,2,40,40));
  pts = pts.concat(rectGrid(2,6,3,60,60));
  pts.push({ x: X0 + 200, y: Y0 + 140, z: 4 });
  return pts.slice(0,144);
}

function dragonLayout() {
  const pts = [];
  let x = X0, y = Y0;
  for (let i = 0; i < 144; i++) {
    pts.push({ x, y, z: Math.floor(i / 36) });
    x += DX;
    if (x > X0 + DX * 10) { x = X0; y += DY; }
  }
  return pts;
}

function bridgeLayout() {
  const left = rectGrid(8,4,0,0,0).concat(rectGrid(6,4,1,0,10));
  const right = left.map(p => ({...p, x: p.x + DX * 8}));
  const bridge = [];
  for (let i = 0; i < 24; i++) {
    const z = i < 12 ? 0 : 1;
    bridge.push({ x: X0 + DX * (4 + (i % 12)), y: Y0 + DY * (i % 6), z });
  }
  return left.concat(right, bridge).slice(0,144);
}

const layouts = { turtle: turtleLayout, dragon: dragonLayout, bridge: bridgeLayout };

export function getLayout(key) {
  const fn = layouts[key] || layouts.turtle;
  const pts = fn();
  return pts.map(p => ({
    x: Math.max(0, Math.min(430 - TILE_W, p.x)),
    y: Math.max(0, Math.min(640 - TILE_H, p.y)),
    z: p.z
  }));
}

export const GRID = { TILE_W, TILE_H, X0, Y0, DX, DY };
