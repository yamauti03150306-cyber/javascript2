const POKEAPI = "https://pokeapi.co/api/v2";

export const getPokemon = async (idOrName, signal) => {
  const res = await fetch(`${POKEAPI}/pokemon/${idOrName}`, { signal });
  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
  return res.json();
};

export const getSpecies = async (idOrName, signal) => {
  const res = await fetch(`${POKEAPI}/pokemon-species/${idOrName}`, { signal });
  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);
  return res.json();
};

let dictCache = null;
let typeCache = null;
let colorCache = null;

export const loadJpDict = async () => {
  if (dictCache) return dictCache;

  const res = await fetch("/jp-pokemon.json");
  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);

  dictCache = await res.json();
  return dictCache;
};

export const loadJpType = async () => {
  if (typeCache) return typeCache;

  const res = await fetch("/jp-type.json");
  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);

  typeCache = await res.json();
  return typeCache;
};

export const loadTypeColors = async () => {
  if (colorCache) return colorCache;

  const res = await fetch("/jp-type-colors.json");
  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);

  colorCache = await res.json();
  return colorCache;
};

let iconCache = null;

export const loadTypeIcons = async () => {
  if (iconCache) return iconCache;

  const res = await fetch("/jp-type-icons.json");
  if (!res.ok) throw new Error(`HTTPエラー: ${res.status}`);

  iconCache = await res.json();
  return iconCache;
};