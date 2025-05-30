# Pokédex SPA 

Welcome to my **Pokédex Single Page Application**, built using HTML, CSS, and JavaScript with the **Pokémon API** and **Axios**! This web app simulates a miniature Pokédex, fetching data from the Pokémon API and letting users explore the first 100 Pokémon in a clean, interactive, and responsive interface.

## Live Demo

[ View the Live Project Here](https://geccobot.github.io/Projects/)

## Preview

![Pokédex Screenshot](banner-image-url.jpg)

---

## Features

###  Character List
- Fetches the **first 151 Pokémon** using the [PokéAPI](https://pokeapi.co/)
- Displays Pokémon names as clickable links
- Clicking a name dynamically displays detailed information for that Pokémon

### Character Card
- Displays:
  - Pokémon ID
  - Name
  - Image
  - Type(s)
- Includes a **Back to List** button to return to the main Pokémon list

###  Carousel Navigation
- "Previous" and "Next" buttons navigate to adjacent Pokémon
- "Previous" button disappears on the first Pokémon
- "Next" button disappears on the last Pokémon

###  Axios Integration
- All API requests are handled with **Axios** and promises

### Responsive Styling
- Clean and consistent theme across the app
- Uses **2-3 color palette** and **2 web fonts**
- Responsive layout for both desktop and mobile viewports

---

##  Stretch Features (If Implemented)

- **Dark Mode / Light Mode Toggle** 
- **Loading Animation** shown while fetching data 

---

##  Technologies Used

- **JavaScript** (DOM manipulation, promises, state handling)
- **HTML5 & CSS3** (flexbox, media queries, custom fonts)
- **Axios** for HTTP requests ([axios GitHub](https://github.com/axios/axios))
- **PokéAPI** to fetch real Pokémon data ([pokeapi.co](https://pokeapi.co/))

