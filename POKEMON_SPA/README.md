[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/24vtW1Yr)
# Exercise: Single Page Application

## Introduction

In this exercise, we will showcase our knowledge of APIs by building an application that serves as a mini database of characters. Use the [Rick and Morty](https://rickandmortyapi.com/), [Star Wars](https://swapi.dev/), [Disney](https://disneyapi.dev/), or [Pokemon](https://pokeapi.co/) API to develop a website that retrieves data from these APIs and displays it in an HTML document.

## Requirements

We will be creating what is referred to as Single Page Application (or "SPA"). **SPAs** are unique in that the entire contents of the website is constructed using JavaScript using one HTML file. Use your knowledge of JavaScript to create a website that initially loads a list of characters from your chosen API that are linked. When you click on any character from the list, a detailed "card" is created showing you more detail about that character. When on that detail page you can click back to the listing using a button.

- **Character List**: This page should retrieve the first 100 characters from your chosen API and display their name while linked. Each link should display the character name. The page should dynamically load the character from the API on click, remove all links from the page and display a character sheet or card with their information.
- **Character Card**: Each character card should display their id, name, image, and one other data point of your choosing to display onto the page. (e.g. TV shows, gender, movies, abilities, etc.) Create a button that recreates all character links again on click.
- **Carousel**: When displaying a single character card, create a previous and next button that loads the data from the previous or next character respectively on click. The previous button should disappear when viewing the first character and the next button should disappear when viewing the last character.
- **Axios**: All HTTP requests should be made using the `axios` library using promises.
- **Well styled**: The website should be uniformly styled using CSS. The website should have a consistent theme throughout all three pages, including a few (2 - 3) colors and two fonts with reasonably spaced and aligned HTML elements. The website should be centered on desktop widths and occupy the entire width of the viewport on all mobile widths.

## Wireframe

![](./_assets/single-page-application-1.png)

## Stretch Goals

- Add a theme mode button to the website. This button should toggle between a dark and light theme on the page.
- Add a loading gif to show when loading data from the API. The loading animation should display in place of the character card when data is being retrieved from the API and should disappear when the data is done loading.

## Tips for Success

- **Test first**: Test the chosen API routes using **Postman** before attempting to make requests using JavaScript. This will avoid potential mistakes where the promise is rejected because the request is malformed.
- **Combine your powers**: To complete this assignment, you must combine your knowledge of creating HTML elements, APIs, and promises. Go back and review these topics if you need a refresher.
- **Step by Step**: We recommend slowing down and testing your code often as it is being written. Otherwise, this may cause issues where several things go wrong simultaneously.
- **Images**: Each API provides image URLs for each character. This image URL can be used as the `src` of the `img` tag to be placed on the HTML document after you retrieve your data.
