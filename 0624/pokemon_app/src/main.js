import "./style.css";
import { animate } from "motion";
import { getPokemon, getSpecies, loadJpDict, loadJpType, loadTypeColors, loadTypeIcons } from "./api.js";
import { renderPokemon, showError, setLoading, setTypeDict, setColorDict, setIconDict } from "./view.js";

const spinner = document.querySelector(".spinner");
const card = document.querySelector(".card");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const keywordInput = document.querySelector("#keyword");
animate(spinner, { rotate: [0, 360] }, { duration: 1, repeat: Infinity, ease: "linear" });

const triggerPokemonAnimation = (image) => {
  image.classList.remove("is-bouncing");
  void image.offsetWidth;
  image.classList.add("is-bouncing");
};

const summonBallKinds = ["poke", "great", "ultra", "master"];

const getRandomBallKind = () => {
  const index = Math.floor(Math.random() * summonBallKinds.length);
  return summonBallKinds[index];
};

const playSummonAnimation = () => {
  return new Promise((resolve) => {
    const stage = document.createElement("div");
    stage.className = "summon-stage";

    const ballKind = getRandomBallKind();

    const ball = document.createElement("div");
    ball.className = `summon-ball summon-ball--${ballKind}`;
    ball.innerHTML = `
      <span class="summon-ball__top"></span>
      <span class="summon-ball__middle"></span>
      <span class="summon-ball__button"></span>
    `;

    stage.appendChild(ball);
    document.body.appendChild(stage);

    animate(ball, {
      x: [-180, -20, 0],
      y: [-160, 28, 0],
      rotate: [0, 540],
      scale: [0.9, 1.08, 1],
    }, {
      duration: 0.85,
      ease: "ease-out",
    });

    animate(ball, {
      scale: [1, 0.85, 1.15, 0],
      opacity: [1, 1, 1, 0],
    }, {
      delay: 0.72,
      duration: 0.35,
      ease: "ease-in",
      onComplete: () => {
        stage.remove();
        resolve();
      },
    });
  });
};

card.addEventListener("click", (event) => {
  const target = event.target.closest(".pokemon-image");
  if (!target) return;

  triggerPokemonAnimation(target);
});

let controller;
let currentPokemonId = null;

const setPagerState = (id) => {
  currentPokemonId = id;
  prevBtn.disabled = !id || id <= 1;
  nextBtn.disabled = !id;
};

const load = async (input) => {
  if (controller) controller.abort();
  controller = new AbortController();

  setLoading(true);

  try {
    const [dict, typeDict, colorDict, iconDict] = await Promise.all([
      loadJpDict(),
      loadJpType(),
      loadTypeColors(),
      loadTypeIcons(),
    ]);
    setTypeDict(typeDict);
    setColorDict(colorDict);
    setIconDict(iconDict);
    const query = dict[input] ?? input.toLowerCase();

    const [pokemon, species] = await Promise.all([
      getPokemon(query, controller.signal),
      getSpecies(query, controller.signal),
    ]);

    const jpName = species.names.find((item) => item.language.name === "ja")?.name;
    await playSummonAnimation();
    renderPokemon(pokemon, jpName);
    setPagerState(pokemon.id);
  } catch (err) {
    if (err.name === "AbortError") return;
    console.error(err);
    setPagerState(null);
    showError("見つかりませんでした");
  } finally {
    setLoading(false);
  }
};

document.querySelector("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  load(keywordInput.value.trim());
});

prevBtn.addEventListener("click", () => {
  if (!currentPokemonId || currentPokemonId <= 1) return;
  load(String(currentPokemonId - 1));
});

nextBtn.addEventListener("click", () => {
  if (!currentPokemonId) return;
  load(String(currentPokemonId + 1));
});