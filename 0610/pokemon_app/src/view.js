const card = document.querySelector(".card");
const errorEl = document.querySelector(".error");
const loader = document.querySelector(".loader");

export const renderPokemon = (data) => {
  const types = data.types.map((item) => item.type.name).join(", ");

  card.innerHTML = `
    <h2>${data.name}</h2>
    <img src="${data.sprites.front_default}" alt="${data.name}">
    <p>タイプ: ${types}</p>
    <p>身長: ${data.height}</p>
    <p>体重: ${data.weight}</p>
  `;
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
