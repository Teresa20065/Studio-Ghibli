document.addEventListener('DOMContentLoaded', () => {
  const characterContainer = document.getElementById('character-container');
  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  // Función para mostrar personajes
  const displayCharacters = (characters) => {
    characterContainer.innerHTML = ''; // Limpiar resultados anteriores
    let row;

    characters.forEach((character, index) => {
      if (index % 3 === 0) {
        row = document.createElement('div');
        row.classList.add('row', 'mb-4');
        characterContainer.appendChild(row);
      }

      const characterCard = document.createElement('div');
      characterCard.classList.add('col-md-4'); // 4 columnas por cada fila (3 items por fila)
      characterCard.innerHTML = `
        <div class="card">
          <img src="${character.image}" class="card-img-top" alt="${character.name}">
          <div class="card-body">
            <h2 class="card-title">${character.name}</h2>
            <p class="card-text">Status: ${character.status}</p>
            <p class="card-text">Species: ${character.species}</p>
            <p class="card-text">Gender: ${character.gender}</p>
          </div>
        </div>
      `;
      row.appendChild(characterCard);
    });
  };

  // Función para buscar personajes
  const searchCharacters = (query) => {
    const url = `https://rickandmortyapi.com/api/character/?name=${query}`;
    fetch(url)
      .then(response => {
        console.log('Response status:', response.status); // Verifica el estado de la respuesta
        return response.json();
      })
      .then(data => {
        console.log('Data from API:', data); // Verifica los datos recibidos
        displayCharacters(data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        characterContainer.innerHTML = '<p>Failed to load characters.</p>';
      });
  };

  // Cargar personajes al iniciar la página
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      console.log('Response status:', response.status); // Verifica el estado de la respuesta
      return response.json();
    })
    .then(data => {
      console.log('Data from API:', data); // Verifica los datos recibidos
      displayCharacters(data.results);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      characterContainer.innerHTML = '<p>Failed to load characters.</p>';
    });

  // Agregar evento de clic al botón de búsqueda
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
      searchCharacters(query);
    }
  });

  // Agregar evento de teclado para buscar al presionar Enter
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        searchCharacters(query);
      }
    }
  });
  // Agregar evento de clic al botón "Cargar más"
  loadMoreButton.addEventListener('click', () => {
    if (nextPageUrl) {
      loadMoreCharacters(nextPageUrl);
    }
  });



});
