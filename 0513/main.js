import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import { getRates, vote } from "./candidates.js";

const animateBars = (rates) => {
  rates.forEach(({ id, rate }) => {
    const bar = document.querySelector(`[data-id="${id}"] .bar`);
    if (!bar) {
      return;
    }

    animate(bar, { width: `${rate}%` }, { duration: 0.4, easing: "ease-out" });
  });
};

const updateLeadingCards = (rates) => {
  const maxVotes = Math.max(0, ...rates.map((item) => item.votes));
  const leadingIds =
    maxVotes === 0
      ? []
      : rates.filter((item) => item.votes === maxVotes).map((item) => item.id);

  document.querySelectorAll(".card").forEach((card) => {
    const id = Number(card.dataset.id);
    const isLeading = leadingIds.includes(id);
    card.classList.toggle("is-leading", isLeading);
  });
};

const refreshUI = () => {
  const rates = getRates();
  animateBars(rates);
  updateLeadingCards(rates);
};

document.querySelectorAll(".card").forEach((card) => {
  const id = Number(card.dataset.id);
  const btn = card.querySelector(".vote-btn");

  if (!btn || Number.isNaN(id)) {
    return;
  }

  btn.addEventListener("click", () => {
    vote(id);
    animate(btn, { scale: [1, 1.3, 1] }, { duration: 0.3, easing: "ease-out" });
    refreshUI();
  });
});

refreshUI();
