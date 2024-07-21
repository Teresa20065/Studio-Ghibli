document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.getElementById('character-container');
  
    fetch(' https://rickandmortyapi.com/api/episode')
      .then(response => {
        console.log('Response status:', response.status); // Verifica el estado de la respuesta
        return response.json();
      })
      .then(data => {
        console.log('Data from API:', data); // Verifica los datos recibidos
        let row;

        data.results.forEach((character,index) => {
            if(index % 3=== 0){
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
                  <p class="card-text">count: ${character.count}</p>
                  <p class="card-text">name: ${character.name}</p>
                  <p class="card-text">episode: ${character.episode}</p>
                </div>
              </div>
          `;
  
          row.appendChild(characterCard);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        characterContainer.innerHTML = '<p>Failed to load characters.</p>';
      });
  });