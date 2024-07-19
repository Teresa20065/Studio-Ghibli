document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.getElementById('character-container');
  
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => {
        console.log('Response status:', response.status); // Verifica el estado de la respuesta
        return response.json();
      })
      .then(data => {
        console.log('Data from API:', data); // Verifica los datos recibidos
        data.results.forEach(character => {
          const characterCard = document.createElement('div');
          characterCard.classList.add('character-card');
          characterCard.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <p>Gender: ${character.gender}</p>
          `;
  
          characterContainer.appendChild(characterCard);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        characterContainer.innerHTML = '<p>Failed to load characters.</p>';
      });
  });