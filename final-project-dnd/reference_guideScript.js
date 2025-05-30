const categories = {
  monsters: [],
  spells: [],
  weapons: []
};
const itemList = document.getElementById('item-list');
const infoCard = document.getElementById('info-card');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const intro = document.getElementById('intro');
let currentCategory = '';
let currentData = [];
let currentIndex = 0;

document.querySelectorAll('.category-selector button').forEach(button => {
  button.addEventListener('click', async () => {
    const category = button.dataset.category;
    currentCategory = category;
    infoCard.style.display = 'none';
    itemList.classList.remove('hidden');
    if (categories[category].length === 0) {
      await fetchCategoryData(category);
    }
    renderItemList(category);
  });
});

// Fetch category data
async function fetchCategoryData(category) {
  let url = '';
  switch (category) {
    case 'monsters':
      url = 'https://www.dnd5eapi.co/api/monsters';
      break;
    case 'spells':
      url = 'https://www.dnd5eapi.co/api/spells';
      break;
    case 'weapons':
      url = 'https://www.dnd5eapi.co/api/equipment-categories/weapon';
      break;
  }

  const res = await fetch(url);
  const data = await res.json();
  console.log(`${category} data:`, data);

  categories[category] = data.results || data.equipment;
}
// Render item list
function renderItemList(category) {
  itemList.innerHTML = '';
  itemList.classList.add('expanded-list');
  currentData = categories[category];
  currentIndex = 0;
  console.log(`${category} current data:`, currentData);
  currentData.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    li.addEventListener('click', () => {
      currentIndex = index;
      showInfoCard(currentData[currentIndex]);
    });
    itemList.appendChild(li);
  });
  infoCard.style.display = 'none';
}

async function showInfoCard(item) {  // Show item details in the info card
  console.log('Clicked item:', item);
  const res = await fetch(`https://www.dnd5eapi.co${item.url}`);
  const data = await res.json();
  console.log('Fetched item data:', data);
  let type = '';
  let description = '';
  let images = [];
  switch (currentCategory) {
    case 'monsters':
      type = `${data.type} ${data.subtype ? `(${data.subtype})` : ''}`;
      description = `Challenge Rating: ${data.challenge_rating}<br>${data.alignment}`;
      break;
    case 'spells':
      type = data.school.name;
      description = data.desc.join('<br>');
      break;
    case 'weapons':
      type = `${data.weapon_category} - ${data.weapon_range}`;
      description = `Damage: ${data.damage?.damage_dice} ${data.damage?.damage_type.name}<br>${data.properties?.map(p => p.name).join(', ')}`;
      break;
  }
  infoCard.innerHTML = `
    <h3 id="info-card-title">${data.name}</h3>
    <p><strong>Type:</strong> <span id="info-card-type">${type}</span></p>
    <p><strong>Description:</strong><br><span id="info-card-description">${description}</span></p>
    <div class="card-buttons">
      <button id="prevBtn">Previous</button>
      <button id="nextBtn">Next</button>
      <button id="backBtn">Back to List</button>
    </div>
  `;
  console.log('Displaying info card for item:', data.name);
  itemList.classList.add('hidden');
  infoCard.style.display = 'block';

  updateCarouselButtons();

  // Button handlers
  document.getElementById('prevBtn').onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showInfoCard(currentData[currentIndex]);
    }
  };

  document.getElementById('nextBtn').onclick = () => {
    if (currentIndex < currentData.length - 1) {
      currentIndex++;
      showInfoCard(currentData[currentIndex]);
    }
  };

  document.getElementById('backBtn').onclick = () => {
    infoCard.style.display = 'none';
    itemList.classList.remove('hidden');
  };
}

// Enable/disable prev/next buttons
function updateCarouselButtons() {
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === currentData.length - 1;
}

// Search functionality
searchBtn.addEventListener('click', async () => {
  const query = searchInput.value.trim().toLowerCase();
  const selectedCategory = document.getElementById('category-filter').value;

  if (!query) return;

  const categoriesToSearch = selectedCategory === 'all'
    ? Object.keys(categories)
    : [selectedCategory];

  for (let category of categoriesToSearch) {
    if (categories[category].length === 0) {
      await fetchCategoryData(category);
    }
  }
  const matchedItems = [];
  for (let category of categoriesToSearch) {
    const data = categories[category];
    data.forEach((item, index) => {
      if (item.name.toLowerCase().includes(query)) {
        matchedItems.push({ item, category, index });
      }
    });
  }
  if (matchedItems.length > 0) {
    if (matchedItems.length === 1) {
      const match = matchedItems[0];
      currentCategory = match.category;
      currentData = categories[match.category];
      currentIndex = match.index;
      showInfoCard(match.item);
    } else {
      renderSearchResults(matchedItems);
    }
  } else {
    suggestSimilarItems(query, categoriesToSearch);
  }
});

function renderSearchResults(results) { //' Render search results in the item list
  itemList.innerHTML = '';
  itemList.classList.add('expanded-list');
  infoCard.style.display = 'none';
  document.querySelector('.content-area').classList.remove('hidden');

  results.forEach(result => {
    const li = document.createElement('li');
    li.textContent = `${result.item.name} (${result.category})`;
    li.addEventListener('click', () => {
      currentCategory = result.category;
      currentData = categories[result.category];
      currentIndex = result.index;
      showInfoCard(result.item);
    });
    itemList.appendChild(li);
  });
}
function suggestSimilarItems(query, categoriesToSearch) {
  const suggestions = [];

  categoriesToSearch.forEach(category => {
    categories[category].forEach(item => {
      const name = item.name.toLowerCase();
      const distance = levenshteinDistance(query, name);
      if (distance <= 3) {
        suggestions.push({ name: item.name, category, distance });
      }
    });
  });

  suggestions.sort((a, b) => a.distance - b.distance);

  if (suggestions.length > 0) {
    const suggestionText = suggestions.slice(0, 5).map(s => `${s.name} (${s.category})`).join('\n');
    alert(`Item not found. Did you mean:\n${suggestionText}`);
  } else {
    alert("Item not found in any category.");
  }
}
function levenshteinDistance(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, 
        matrix[i][j - 1] + 1, 
        matrix[i - 1][j - 1] + cost 
      );
    }
  }
  return matrix[a.length][b.length];
}


