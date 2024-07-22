import {
  sortByNewest,
  sortByOldest,
  filterDirector,
  filterGender,
  sortByAZ,
  sortByZA,
  totalCharacterGender,
} from "./data.js";
//Nos dimos cuenta que data puede ser cualquier palabra ya que funciona "como una variable"
import data from "./data/ghibli/ghibli.js";
//Declaramos una variable que recupera los films de la data
const dataGhibli = data.films;
const people = dataGhibli.flatMap((movie) => movie.people);
const btnHome = document.getElementById("btn-home");
const btnMovies = document.getElementById("btn-movies");
const btnCharacters = document.getElementById("btn-characters");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-item");
const sortOptions = document.getElementById("sortOptions");
const sortCharacters = document.getElementById("sortCharacters");
const filterOptions = document.getElementById("directorByFilter");
const filterByGender = document.getElementById("genderFilter");
const movieContainer = document.getElementById("movieContainer");
const characterContainer = document.getElementById("characterContainer");
const resultFemaleCharacters = document.getElementById("funFactFemale");
const resultMaleCharacters = document.getElementById("funFactMale");

let filtered = dataGhibli;
let filteredPeople = people;

//Función de menú hamburger
function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}
hamburger.addEventListener("click", mobileMenu);

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}
navLink.forEach((n) => n.addEventListener("click", closeMenu));

//Función para ingresar a la página Home
function displayHomepage() {
  //Esconder Movie
  const movieWrap = document.getElementById("movieWrap");
  movieWrap.style.display = "none";
  //Esconder Personajes
  const characterWrap = document.getElementById("characterWrap");
  characterWrap.style.display = "none";
  //Mostrar home
  const homeWrap = document.getElementById("homeWrap");
  homeWrap.style.display = "flex";
}
btnHome.addEventListener("click", displayHomepage);

document.addEventListener("DOMContentLoaded", (event) => {
  const slides = document.querySelector(".slides");
  const radios = document.querySelectorAll(".navigation-manual input");
  const slideCount = document.querySelectorAll(".slide").length;
  let currentIndex = 0;

  function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlidePosition();
    updateRadio();
  }

  function updateSlidePosition() {
    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
  }

  function updateRadio() {
    radios[currentIndex].checked = true;
  }

  setInterval(moveToNextSlide, 1300); // Cambia cada 2 segundos
});

function displayMoviePage() {
  //Ocultar el carrusel
  const homeWrap = document.getElementById("homeWrap");
  homeWrap.style.display = "none";
  //Ocultar los personajes
  const characterWrap = document.getElementById("characterWrap");
  characterWrap.style.display = "none";
  //Mostrar barra de sort, filter
  const movieWrap = document.getElementById("movieWrap");
  movieWrap.style.display = "flex";
}
btnMovies.addEventListener("click", displayMoviePage);

function displayCharacterPage() {
  //Esconder home
  const homeWrap = document.getElementById("homeWrap");
  homeWrap.style.display = "none";
  //Esconder Movie
  const movieWrap = document.getElementById("movieWrap");
  movieWrap.style.display = "none";
  //Mostrar Personajes
  const characterWrap = document.getElementById("characterWrap");
  characterWrap.style.display = "flex";
}
btnCharacters.addEventListener("click", displayCharacterPage);

// Función para despliegue de personajes
function displayCharacters(filmCharacters) {
  filmCharacters.forEach((people) => {
    const createFigure = document.createElement("figure");
    const createImg = document.createElement("img");
    const createName = document.createElement("p");
    const createAge = document.createElement("p");
    const createGender = document.createElement("p");

    createFigure.setAttribute("class", "characterFigure");
    createImg.setAttribute("src", people.img);
    createImg.setAttribute("class", "characterPicture");
    createName.innerHTML = people.name;
    createName.setAttribute("class", "characterName");
    createAge.innerHTML = people.age;
    createAge.setAttribute("class", "characterInfo");
    createGender.innerHTML = people.gender;
    createGender.setAttribute("class", "characterInfo");

    createFigure.appendChild(createImg);
    createFigure.appendChild(createName);
    createFigure.appendChild(createAge);
    createFigure.appendChild(createGender);
    characterContainer.appendChild(createFigure);
  });
}
displayCharacters(people);

// Función para despliegue de películas
function displayFilms(films) {
  films.forEach((film) => {
    const createFigure = document.createElement("figure");
    const createImg = document.createElement("img");
    const createH3 = document.createElement("h3");
    const createP = document.createElement("p");
    const createDescriptionContainer = document.createElement("div");
    const createDescriptionText = document.createElement("p");

    createFigure.setAttribute("class", "filmContainer");
    createImg.setAttribute("src", film.poster);
    createImg.setAttribute("class", "filmPoster");
    createH3.innerHTML = film.title;
    createH3.setAttribute("class", "filmTitle");
    createP.innerHTML = film.release_date;
    createP.setAttribute("class", "filmInformation");
    createDescriptionContainer.setAttribute("class", "descriptionContainer");
    createDescriptionText.innerHTML = film.description;
    createDescriptionText.setAttribute("class", "descriptionText");

    createFigure.appendChild(createImg);
    createFigure.appendChild(createH3);
    createFigure.appendChild(createP);
    movieContainer.appendChild(createFigure);
    createFigure.appendChild(createDescriptionContainer);
    createDescriptionContainer.appendChild(createDescriptionText);
  });
}
displayFilms(filtered);

//Ordenar películas por más recientes
function sortByNewestMovies() {
  const newestOrder = sortByNewest(filtered);
  movieContainer.innerHTML = "";
  return displayFilms(newestOrder);
}

//Ordenar películas por más antiguas
function sortByOldestMovies() {
  const oldestOrder = sortByOldest(filtered);
  movieContainer.innerHTML = "";
  return displayFilms(oldestOrder);
}

// Escuchador de evento para la función de ordenado por fecha de lanzamiento
sortOptions.addEventListener("click", function () {
  if (sortOptions.value === "newest") {
    sortByNewestMovies();
  } else if (sortOptions.value === "oldest") {
    sortByOldestMovies();
  }
});

function sortByAZCharacters() {
  const azOrder = sortByAZ(filteredPeople);
  characterContainer.innerHTML = "";
  return displayCharacters(azOrder);
}

function sortByZACharacters() {
  const zaOrder = sortByZA(filteredPeople);
  characterContainer.innerHTML = "";
  return displayCharacters(zaOrder);
}

sortCharacters.addEventListener("click", function () {
  if (sortCharacters.value === "A-Z") {
    sortByAZCharacters();
  } else if (sortCharacters.value === "Z-A") {
    sortByZACharacters();
  }
});

// Escuchador de evento para la función de filtrado por director
filterOptions.addEventListener("change", () => {
  const directorSelected = filterOptions.value;
  filtered = filterDirector(dataGhibli, directorSelected);
  movieContainer.innerHTML = "";
  displayFilms(filtered);
});

// Escuchador de evento para la función de filtrar por género
filterByGender.addEventListener("change", () => {
  const genderSelected = filterByGender.value;
  filteredPeople = filterGender(people, genderSelected);
  characterContainer.innerHTML = "";
  displayCharacters(filteredPeople);
});

//Funciones para mostrar fun facts
function displayFemaleFunFact() {
  const maleFunFactContainer = document.getElementById("maleFunFact");
  maleFunFactContainer.style.display = "none";

  const femaleFunFactContainer = document.getElementById("femaleFunFact");
  femaleFunFactContainer.style.display = "flex";

  resultFemaleCharacters.textContent =
    "Did you know! The percentage of female characters in the Ghibli universe is " +
    Math.ceil(totalCharacterGender(people, "Female") * 0.58) +
    "%" +
    ".";
}

function displayMaleFunFact() {
  const femaleFunFactContainer = document.getElementById("femaleFunFact");
  femaleFunFactContainer.style.display = "none";

  const maleFunFactContainer = document.getElementById("maleFunFact");
  maleFunFactContainer.style.display = "flex";

  resultMaleCharacters.textContent =
    "Did you know! The percentage of Male characters in the Ghibli universe is " +
    Math.ceil(totalCharacterGender(people, "Male") * 0.58) +
    "%" +
    ".";
}

filterByGender.addEventListener("change", () => {
  if (filterByGender.value === "Female") {
    displayFemaleFunFact();
  } else if (filterByGender.value === "Male") {
    displayMaleFunFact();
  }
});
