
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Themes provide sets of 36 unique "faces". Each face:
 * { key: string, label: string, emoji: string }
 * The deck is built as faces repeated evenly to fill the tile count.
 */

function ensureLength(base, needed, prefix) {
  const out = base.slice();
  let i = 1;
  while (out.length < needed) {
    out.push({ key: `${prefix.toLowerCase()}-${base.length+i}`, label: `${prefix} ${base.length+i}`, emoji: out[i % base.length].emoji });
    i++;
  }
  return out.slice(0, needed);
}

const cats = ensureLength([
  { key:'cat-abyssinian', label:'Abyssinian', emoji:'🐱' },
  { key:'cat-siamese', label:'Siamese', emoji:'🐱' },
  { key:'cat-bengal', label:'Bengal', emoji:'🐱' },
  { key:'cat-sphynx', label:'Sphynx', emoji:'🐱' },
  { key:'cat-persian', label:'Persian', emoji:'🐱' },
  { key:'cat-mainecoon', label:'Maine Coon', emoji:'🐱' },
  { key:'cat-ragdoll', label:'Ragdoll', emoji:'🐱' },
  { key:'cat-scottish', label:'Scottish Fold', emoji:'🐱' },
  { key:'cat-british', label:'British Shorthair', emoji:'🐱' },
  { key:'cat-devon', label:'Devon Rex', emoji:'🐱' },
  { key:'cat-birman', label:'Birman', emoji:'🐱' },
  { key:'cat-norwegian', label:'Norwegian', emoji:'🐱' },
  { key:'cat-siberian', label:'Siberian', emoji:'🐱' },
  { key:'cat-oriental', label:'Oriental', emoji:'🐱' },
  { key:'cat-american', label:'American Shorthair', emoji:'🐱' },
  { key:'cat-russian', label:'Russian Blue', emoji:'🐱' },
  { key:'cat-exotic', label:'Exotic', emoji:'🐱' },
  { key:'cat-ocicat', label:'Ocicat', emoji:'🐱' },
], 36, 'Cat');

const dogs = ensureLength([
  { key:'dog-lab', label:'Labrador', emoji:'🐶' },
  { key:'dog-poodle', label:'Poodle', emoji:'🐶' },
  { key:'dog-bulldog', label:'Bulldog', emoji:'🐶' },
  { key:'dog-beagle', label:'Beagle', emoji:'🐶' },
  { key:'dog-dachshund', label:'Dachshund', emoji:'🐶' },
  { key:'dog-chihuahua', label:'Chihuahua', emoji:'🐶' },
  { key:'dog-shiba', label:'Shiba', emoji:'🐶' },
  { key:'dog-husky', label:'Husky', emoji:'🐶' },
  { key:'dog-corgi', label:'Corgi', emoji:'🐶' },
  { key:'dog-boxer', label:'Boxer', emoji:'🐶' },
  { key:'dog-malamute', label:'Malamute', emoji:'🐶' },
  { key:'dog-akita', label:'Akita', emoji:'🐶' },
  { key:'dog-border', label:'Border Collie', emoji:'🐶' },
  { key:'dog-golden', label:'Golden', emoji:'🐶' },
  { key:'dog-pug', label:'Pug', emoji:'🐶' },
  { key:'dog-mastiff', label:'Mastiff', emoji:'🐶' },
  { key:'dog-rottweiler', label:'Rottweiler', emoji:'🐶' },
  { key:'dog-shepherd', label:'German Shepherd', emoji:'🐶' },
], 36, 'Dog');

const horses = ensureLength([
  { key:'horse-arabian', label:'Arabian', emoji:'🐴' },
  { key:'horse-mustang', label:'Mustang', emoji:'🐴' },
  { key:'horse-friesian', label:'Friesian', emoji:'🐴' },
  { key:'horse-appaloosa', label:'Appaloosa', emoji:'🐴' },
  { key:'horse-thoroughbred', label:'Thoroughbred', emoji:'🐴' },
  { key:'horse-clydesdale', label:'Clydesdale', emoji:'🐴' },
  { key:'horse-icelandic', label:'Icelandic', emoji:'🐴' },
  { key:'horse-andalusian', label:'Andalusian', emoji:'🐴' },
  { key:'horse-miniature', label:'Miniature', emoji:'🐴' },
  { key:'horse-hanoverian', label:'Hanoverian', emoji:'🐴' },
  { key:'horse-lipizzan', label:'Lipizzan', emoji:'🐴' },
  { key:'horse-morgan', label:'Morgan', emoji:'🐴' },
  { key:'horse-percheron', label:'Percheron', emoji:'🐴' },
  { key:'horse-pony', label:'Pony', emoji:'🐴' },
  { key:'horse-tennessee', label:'Tennessee', emoji:'🐴' },
  { key:'horse-trakehner', label:'Trakehner', emoji:'🐴' },
  { key:'horse-warmblood', label:'Warmblood', emoji:'🐴' },
  { key:'horse-welsh', label:'Welsh', emoji:'🐴' },
], 36, 'Horse');

const reptiles = ensureLength([
  { key:'rep-iguana', label:'Iguana', emoji:'🦎' },
  { key:'rep-chameleon', label:'Chameleon', emoji:'🦎' },
  { key:'rep-gecko', label:'Gecko', emoji:'🦎' },
  { key:'rep-komodo', label:'Komodo', emoji:'🦎' },
  { key:'rep-cobra', label:'Cobra', emoji:'🐍' },
  { key:'rep-python', label:'Python', emoji:'🐍' },
  { key:'rep-tortoise', label:'Tortoise', emoji:'🐢' },
  { key:'rep-turtle', label:'Sea Turtle', emoji:'🐢' },
  { key:'rep-alligator', label:'Alligator', emoji:'🐊' },
  { key:'rep-croc', label:'Crocodile', emoji:'🐊' },
  { key:'rep-anole', label:'Anole', emoji:'🦎' },
  { key:'rep-skink', label:'Skink', emoji:'🦎' },
  { key:'rep-boa', label:'Boa', emoji:'🐍' },
  { key:'rep-garter', label:'Garter Snake', emoji:'🐍' },
  { key:'rep-monitor', label:'Monitor', emoji:'🦎' },
  { key:'rep-helmet', label:'Helmet Gecko', emoji:'🦎' },
  { key:'rep-viper', label:'Viper', emoji:'🐍' },
  { key:'rep-krait', label:'Krait', emoji:'🐍' },
], 36, 'Reptile');

const fish = ensureLength([
  { key:'fish-clown', label:'Clownfish', emoji:'🐠' },
  { key:'fish-tang', label:'Blue Tang', emoji:'🐠' },
  { key:'fish-angel', label:'Angelfish', emoji:'🐠' },
  { key:'fish-betta', label:'Betta', emoji:'🐟' },
  { key:'fish-koi', label:'Koi', emoji:'🐟' },
  { key:'fish-gold', label:'Goldfish', emoji:'🐟' },
  { key:'fish-carp', label:'Carp', emoji:'🐟' },
  { key:'fish-catfish', label:'Catfish', emoji:'🐟' },
  { key:'fish-salmon', label:'Salmon', emoji:'🐟' },
  { key:'fish-trout', label:'Trout', emoji:'🐟' },
  { key:'fish-bass', label:'Bass', emoji:'🐟' },
  { key:'fish-mackerel', label:'Mackerel', emoji:'🐟' },
  { key:'fish-sardine', label:'Sardine', emoji:'🐟' },
  { key:'fish-herring', label:'Herring', emoji:'🐟' },
  { key:'fish-shark', label:'Shark', emoji:'🦈' },
  { key:'fish-ray', label:'Ray', emoji:'🛸' },
  { key:'fish-marlin', label:'Marlin', emoji:'🐟' },
  { key:'fish-tuna', label:'Tuna', emoji:'🐟' },
], 36, 'Fish');

const insects = ensureLength([
  { key:'ins-ant', label:'Ant', emoji:'🐜' },
  { key:'ins-bee', label:'Bee', emoji:'🐝' },
  { key:'ins-butterfly', label:'Butterfly', emoji:'🦋' },
  { key:'ins-beetle', label:'Beetle', emoji:'🪲' },
  { key:'ins-cockroach', label:'Cockroach', emoji:'🪳' },
  { key:'ins-cricket', label:'Cricket', emoji:'🦗' },
  { key:'ins-dragonfly', label:'Dragonfly', emoji:'🐝' },
  { key:'ins-firefly', label:'Firefly', emoji:'✨' },
  { key:'ins-grasshopper', label:'Grasshopper', emoji:'🦗' },
  { key:'ins-ladybug', label:'Ladybug', emoji:'🐞' },
  { key:'ins-mantis', label:'Mantis', emoji:'🦗' },
  { key:'ins-mosquito', label:'Mosquito', emoji:'🦟' },
  { key:'ins-moth', label:'Moth', emoji:'🦋' },
  { key:'ins-termite', label:'Termite', emoji:'🐜' },
  { key:'ins-wasp', label:'Wasp', emoji:'🐝' },
  { key:'ins-weevil', label:'Weevil', emoji:'🪲' },
  { key:'ins-centipede', label:'Centipede', emoji:'🐛' },
  { key:'ins-millipede', label:'Millipede', emoji:'🐛' },
], 36, 'Insect');

const plants = ensureLength([
  { key:'plant-rose', label:'Rose', emoji:'🌹' },
  { key:'plant-tulip', label:'Tulip', emoji:'🌷' },
  { key:'plant-sunflower', label:'Sunflower', emoji:'🌻' },
  { key:'plant-lily', label:'Lily', emoji:'🌸' },
  { key:'plant-orchid', label:'Orchid', emoji:'🌸' },
  { key:'plant-lotus', label:'Lotus', emoji:'🌸' },
  { key:'plant-cactus', label:'Cactus', emoji:'🌵' },
  { key:'plant-palm', label:'Palm', emoji:'🌴' },
  { key:'plant-maple', label:'Maple', emoji:'🍁' },
  { key:'plant-oak', label:'Oak', emoji:'🌳' },
  { key:'plant-pine', label:'Pine', emoji:'🌲' },
  { key:'plant-bamboo', label:'Bamboo', emoji:'🎋' },
  { key:'plant-herb', label:'Herb', emoji:'🌿' },
  { key:'plant-mushroom', label:'Mushroom', emoji:'🍄' },
  { key:'plant-aloe', label:'Aloe', emoji:'🌵' },
  { key:'plant-fern', label:'Fern', emoji:'🌿' },
  { key:'plant-daisy', label:'Daisy', emoji:'🌼' },
  { key:'plant-peony', label:'Peony', emoji:'🌸' },
], 36, 'Plant');

const birds = ensureLength([
  { key:'bird-eagle', label:'Eagle', emoji:'🦅' },
  { key:'bird-owl', label:'Owl', emoji:'🦉' },
  { key:'bird-parrot', label:'Parrot', emoji:'🦜' },
  { key:'bird-penguin', label:'Penguin', emoji:'🐧' },
  { key:'bird-swan', label:'Swan', emoji:'🦢' },
  { key:'bird-duck', label:'Duck', emoji:'🦆' },
  { key:'bird-hawk', label:'Hawk', emoji:'🦅' },
  { key:'bird-falcon', label:'Falcon', emoji:'🦅' },
  { key:'bird-robin', label:'Robin', emoji:'🐦' },
  { key:'bird-sparrow', label:'Sparrow', emoji:'🐦' },
  { key:'bird-flamingo', label:'Flamingo', emoji:'🦩' },
  { key:'bird-peacock', label:'Peacock', emoji:'🦚' },
  { key:'bird-humming', label:'Hummingbird', emoji:'🐦' },
  { key:'bird-heron', label:'Heron', emoji:'🐦' },
  { key:'bird-kiwi', label:'Kiwi', emoji:'🐦' },
  { key:'bird-crow', label:'Crow', emoji:'🐦' },
  { key:'bird-raven', label:'Raven', emoji:'🐦' },
  { key:'bird-stork', label:'Stork', emoji:'🐦' },
], 36, 'Bird');

export const themes = {
  cats: { meta: { name:'Cats', description:'Feline friends from Abyssinian to Sphynx' }, faces: cats },
  dogs: { meta: { name:'Dogs', description:'Good boys & girls' }, faces: dogs },
  horses: { meta: { name:'Horses', description:'Breeds and beauties' }, faces: horses },
  reptiles: { meta: { name:'Reptiles', description:'Scales & shells' }, faces: reptiles },
  fish: { meta: { name:'Fish', description:'Sea & river life' }, faces: fish },
  insects: { meta: { name:'Insects', description:'Tiny powerhouses' }, faces: insects },
  plants: { meta: { name:'Plants', description:'Botanical set' }, faces: plants },
  birds: { meta: { name:'Birds', description:'Feathered friends' }, faces: birds },
};

const DEFAULT_THEME_KEY = 'cats';

export function makeDeckForTheme(theme, tileCount) {
  // Build a deck by repeating 36 unique faces evenly to fill tileCount (144 by default)
  const unique = theme.faces.slice(0, 36);
  // Build pairs: each face appears equally many times; prefer 4x for 144 / 36
  const repeats = Math.max(2, Math.round(tileCount / unique.length));
  const deck = [];
  for (let i = 0; i < unique.length; i++) {
    for (let r = 0; r < repeats; r++) deck.push(unique[i]);
  }
  // Adjust to exact tileCount
  return deck.slice(0, tileCount);
}

const ThemeCtx = createContext({
  themeKey: DEFAULT_THEME_KEY,
  setThemeKey: (_k) => {},
  theme: themes[DEFAULT_THEME_KEY],
});

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(DEFAULT_THEME_KEY);
  const theme = themes[themeKey] || themes[DEFAULT_THEME_KEY];

  useEffect(() => {
    AsyncStorage.getItem('mahjong_theme').then(v => { if (v && themes[v]) setThemeKey(v); });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('mahjong_theme', themeKey).catch(() => {});
  }, [themeKey]);

  return (
    <ThemeCtx.Provider value={{ themeKey, setThemeKey, theme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeCtx);
}

/**
 * TODO (Art Drop-in)
 * - If you want to swap emoji labels for PNGs, add an `image` field to each face:
 *   { key, label, emoji, image: require('../../assets/themes/cats/abyssinian.png') }
 * - Then in <Tile/> render <Image source={tile.face.image} /> instead of emoji text.
 */
