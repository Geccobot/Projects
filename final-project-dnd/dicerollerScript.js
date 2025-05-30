const skillsApiUrl = "https://www.dnd5eapi.co/api/skills";

const abilityScores = { // Ability scores
    0: "str",
    1: "dex",
    2: "con", 
    3: "int", 
    4: "wis", 
    5: "cha"  
};

function calculateModifier(score) { // Calculate the ability modifier from the score
    return Math.floor((score - 10) / 2);
}

async function fetchSkills() { // Fetch skills from the D&D API
    const response = await fetch(skillsApiUrl);
    const data = await response.json();
    const skills = data.results;
    const skillToAbilityMap = {};
    skills.forEach(skill => {
        const ability = skill.ability_score.name.toLowerCase(); 
        skillToAbilityMap[skill.index] = ability; 
    });
    populateSkillModifiers(skillToAbilityMap);
}
function populateSkillModifiers(skillToAbilityMap) { // Populate the skill modifiers based on ability scores
    const skillSelect = document.querySelector('#skill_select');
    skillSelect.querySelectorAll('option').forEach(option => {
        const skillKey = option.value.toLowerCase();
        const ability = skillToAbilityMap[skillKey]; 
        const abilityScore = parseInt(document.querySelector(`#${ability}_field`).value);
        const mod = calculateModifier(abilityScore);
        const skillResultElements = document.querySelectorAll(`.${ability}_result`);
        skillResultElements.forEach(skillElement => {
            skillElement.innerHTML = mod;
        });
    });
}

function rollDice() { // Roll the dice based on the selected skill and die type
    const skillSelect = document.querySelector('#skill_select');
    const dieSelect = document.querySelector('#die_type');
    const selectedSkill = skillSelect.value;
    const dieType = parseInt(dieSelect.value);
    let roll = Math.floor(Math.random() * dieType) + 1;
    const ability = skillSelect.options[skillSelect.selectedIndex].text.split('(')[1].split(')')[0].toLowerCase();
    const abilityScore = parseInt(document.querySelector(`#${ability}_field`).value);
    const abilityMod = calculateModifier(abilityScore);
    const result = roll + abilityMod;
    document.querySelector('#roll_number').innerText = `${roll} (Mod: ${abilityMod}) => Total: ${result}`;
}

document.addEventListener('DOMContentLoaded', () => { // Fetch skills on page load
});
