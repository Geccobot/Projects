[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/A5KURZDZ)

link to page: https://atlas-school-classroom.github.io/final-project-dnd/ ------

Austin Nance (Home page; bug fixes; styling)
Terrell Smith (Character Sheet)
Demond Balentine (reference guide)
Matthew Long (Dice roller)

  This webpage is a DND hub that is meant to be a companion to any player. 
The character sheet randomizer helps players quicly create a new character. 
The reference guide is a list of monsters, spells and weapons to kear more 
about what they do. The Dice roller is a tool to help with skill checks using
the players input and referencing the api for what skills are affected by what stats.

  Each page uses the API a bit differently. The character sheet is fetching class data, race data, and equipment and populating it in the 
  text fields when promtpted. The reference guide is fetching lots of data, such as: all monsters, all spells, and all weapons listed on the API. It is also grabbing their specific data like challange rating, alignment, damage modifiers and descriptions. The dice roller is fetching
  all skill checks as well as their associated modifiers so when you roll, 
  the modifiers use the stats that were entered to affect the roll. 