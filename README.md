
# Mahjong Animals (Expo)

A mobile Mahjong **Solitaire** game (pair-matching) with selectable **Animal** themes: Cats, Dogs, Horses, Reptiles, Fish, Insects, Plants, Birds.

## Run

```bash
pnpm i # or npm i / yarn
npx expo start
```

## Features
- Classic Mahjong Solitaire: tap pairs of **free** tiles to remove them.
- Hint, Shuffle-Free-Tiles, Restart.
- Timer and move counter.
- Multiple layouts: **Turtle**, **Dragon**, **Bridge**.
- Theming system with 8 Animal categories (easy to extend).

## Replace Art
- All tile faces currently render as emoji + label (fast for prototyping).
- To reskin with art: drop PNGs into `assets/themes/<theme>/<key>.png` and map them in `src/themes/index.js` (see TODO section inside).

## Notes
- The "free" rule: a tile is free if (1) **no tile overlaps it from above** and (2) **at least one side** (left or right) is unblocked on the same layer.
- Layout coordinates are simplified for mobile and tuned for 144 tiles.
