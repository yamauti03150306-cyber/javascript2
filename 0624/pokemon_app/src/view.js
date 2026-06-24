const card = document.querySelector(".card");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");

let typeDict = null;
let colorDict = null;
let iconDict = null;

export const setTypeDict = (dict) => {
  typeDict = dict;
};

export const setColorDict = (dict) => {
  colorDict = dict;
};

export const setIconDict = (dict) => {
  iconDict = dict;
};

export const renderPokemon = (data, jpName) => {
  const displayName = jpName ?? data.name;
  const primaryType = data.types[0]?.type.name;
  const colors = colorDict?.[primaryType] || { bg: "#D4F1D9", text: "#000000", border: "#999999" };
  const maxStat = 255;

  const statLabels = {
    hp: "HP",
    attack: "こうげき",
    defense: "ぼうぎょ",
    "special-attack": "とくこう",
    "special-defense": "とくぼう",
    speed: "すばやさ",
  };

  const types = data.types
    .map((item) => {
      const englishType = item.type.name;
      const jpTypeName = typeDict?.[englishType] ?? englishType;
      const icon = iconDict?.[englishType] ?? "";
      return `${icon} ${jpTypeName}`;
    })
    .join("　");

  const stats = data.stats
    .map((item) => {
      const name = statLabels[item.stat.name] ?? item.stat.name;
      const meterWidth = Math.min(100, (item.base_stat / maxStat) * 100);
      return `
        <li class="stat-item">
          <div class="stat-head">
            <span>${name}</span>
            <strong>${item.base_stat}</strong>
          </div>
          <div class="stat-meter" aria-hidden="true">
            <span style="width: ${meterWidth}%"></span>
          </div>
        </li>
      `;
    })
    .join("");

  card.innerHTML = `
    <h2>${displayName} <small>(${data.name})</small></h2>
    <img class="pokemon-image" src="${data.sprites.front_default}" alt="${displayName}">
    <p>タイプ: ${types}</p>
    <p>身長: ${data.height}</p>
    <p>体重: ${data.weight}</p>
    <section class="stats">
      <h3>ステータス</h3>
      <ul>${stats}</ul>
    </section>
  `;

  card.style.backgroundColor = colors.bg;
  card.style.borderColor = colors.border;
  card.style.color = colors.text;
  document.body.style.background = colors.bg;
  document.body.style.color = colors.text;

  card.hidden = false;
  errorEl.hidden = true;
};

export const showError = (message) => {
  errorEl.textContent = message;
  errorEl.hidden = false;
  card.hidden = true;
};

export const setLoading = (isLoading) => {
  loader.hidden = !isLoading;
  if (isLoading) {
    card.hidden = true;
    errorEl.hidden = true;
  }
};