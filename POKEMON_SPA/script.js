const listContainer = document.getElementById('list-container');
const detailSection = document.getElementById('pokemon-detail');
const listSection = document.getElementById('pokemon-list');
const nameEl = document.getElementById('pokemon-name');
const imageEl = document.getElementById('pokemon-image');
const idEl = document.getElementById('pokemon-id');
const typeEl = document.getElementById('pokemon-type');
const backBtn = document.getElementById('back-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const typeColors = { // Pokémon type colors
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

let currentPokemonId = 1;

async function loadPokemonList() { // Fetch Pokémon list from API
  try {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
    const pokemonList = res.data.results;

    pokemonList.forEach((pokemon, index) => {
      const li = document.createElement('li');
      li.textContent = capitalize(pokemon.name);
      li.addEventListener('click', () => showPokemonDetails(index + 1));
      listContainer.appendChild(li);
    });
  } catch (error) {
    alert('Failed to load Pokémon list. Please try again later.');
    console.error(error);
  }
}

async function fetchPokemonData(url) { // Fetch Pokémon data from API
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    alert('Failed to load Pokémon data. Please try again later.');
    console.error(error);
  }
}

async function showPokemonDetails(id) { // Show Pokémon details
  const data = await fetchPokemonData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!data) return;

  nameEl.textContent = capitalize(data.name);
  const sprite = data.sprites.other['official-artwork'].front_default;
  imageEl.src = sprite;
  imageEl.classList.remove('loaded');
  void imageEl.offsetWidth;
  imageEl.onload = () => imageEl.classList.add('loaded');
  if (imageEl.complete) imageEl.classList.add('loaded');

  idEl.textContent = `#${data.id}`;
  idEl.style.marginBottom = '20px';

  typeEl.innerHTML = '';
  const types = data.types.map(t => capitalize(t.type.name));
  types.forEach(type => { // Create type boxes with colors
    const typeBox = document.createElement('span');
    typeBox.textContent = type;
    typeBox.style.backgroundColor = typeColors[type.toLowerCase()];
    typeBox.style.color = '#fff';
    typeBox.style.padding = '5px 10px';
    typeBox.style.marginRight = '10px';
    typeBox.style.borderRadius = '5px';
    typeBox.style.fontWeight = 'bold';
    typeEl.appendChild(typeBox);
  });

  listSection.classList.add('hidden');
  detailSection.classList.remove('hidden');
  document.querySelector('.app-container').classList.add('details-visible');

  currentPokemonId = data.id;
  prevBtn.style.display = currentPokemonId === 1 ? 'none' : 'inline-block';
  nextBtn.style.display = currentPokemonId === 151 ? 'none' : 'inline-block';
}

backBtn.addEventListener('click', () => { // Back button to return to list
  detailSection.classList.add('hidden');
  listSection.classList.remove('hidden');
  document.querySelector('.app-container').classList.remove('details-visible');
  listContainer.innerHTML = '';
  loadPokemonList();
});

prevBtn.addEventListener('click', () => { // Previous button to navigate through Pokémon
  if (currentPokemonId > 1) {
    currentPokemonId--;
    showPokemonDetails(currentPokemonId);
  }
});

nextBtn.addEventListener('click', () => { // Next button to navigate through Pokémon
  if (currentPokemonId < 151) {
    currentPokemonId++;
    showPokemonDetails(currentPokemonId);
  }
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

loadPokemonList();
