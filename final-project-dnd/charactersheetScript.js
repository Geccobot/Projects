const apiBaseUrl = "https://www.dnd5eapi.co/api";

// Populate class options
async function fetchClasses() {
    const response = await fetch(`${apiBaseUrl}/classes`);
    const data = await response.json();
    const classSelect = document.getElementById('character-class');
    data.results.forEach(cls => {
        const option = document.createElement('option');
        option.value = cls.index;
        option.textContent = cls.name;
        classSelect.appendChild(option);
    });
}

// Populate race options
async function fetchRaces() {
    const response = await fetch(`${apiBaseUrl}/races`);
    const data = await response.json();
    const raceSelect = document.getElementById('character-race');
    data.results.forEach(race => {
        const option = document.createElement('option');
        option.value = race.index;
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });
}

// Fetch random items for the equipment
async function fetchRandomEquipment() {
    const response = await fetch(`${apiBaseUrl}/equipment`);
    const data = await response.json();
    const randomItems = [];
    for (let i = 0; i < 2; i++) {
        const randomItem = data.results[Math.floor(Math.random() * data.results.length)];
        randomItems.push(randomItem.name); // Push the item name into the array
    }
    return randomItems;
}

// Randomize stats
function randomizeStats() {
    const abilityScores = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    let stats = {};
    abilityScores.forEach(score => {
        stats[score] = Math.floor(Math.random() * 18) + 3; 
    });
    Object.keys(stats).forEach(score => {
        document.getElementById(score).value = stats[score];
    });
    document.getElementById('armor-class').value = Math.floor(Math.random() * 10) + 10;
    document.getElementById('speed').value = Math.floor(Math.random() * 30) + 25; 
    document.getElementById('hit-points').value = Math.floor(Math.random() * 10) + 5; 
    document.getElementById('hit-dice').value = "1d10";
}
document.getElementById('randomize-button').addEventListener('click', async () => {
    const name = document.getElementById('character-name').value;
    const characterClass = document.getElementById('character-class').value;
    const characterRace = document.getElementById('character-race').value;
    const characterAlignment = document.getElementById('character-alignment').value;
    const characterBackground = document.getElementById('character-background').value;
    if (!name || !characterClass || !characterRace || !characterAlignment || !characterBackground) {
        alert("Please fill in all fields before randomizing!");
        return;
    }
    randomizeStats();
    const randomItems = await fetchRandomEquipment();
    document.getElementById('equipment').value = randomItems.join(', ');
    alert(`Character Created: \n Name: ${name} \n Class: ${characterClass} \n Race: ${characterRace} \n Alignment: ${characterAlignment} \n Background: ${characterBackground}`);
});
fetchClasses();
fetchRaces();
