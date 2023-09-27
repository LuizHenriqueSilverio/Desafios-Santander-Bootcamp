function loadPokemonDetails() {
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('id');
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((pokeDetail) => {
            const pokemon = convertPokeApiDetailToPokemon(pokeDetail);
            displayPokemonDetails(pokemon);
        })
        .catch((error) => {
            console.error(error);
        });
}

function convertPokemonDetailToHtml(pokemon) {
    return `
        <div class="pokemon-details">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <div class="attributes">
                <h2>Attributes:</h2>
                <ul>
                    <li>Height: ${pokemon.height} decimetres</li>
                    <li>Weight: ${pokemon.weight} hectograms</li>
                    <li>HP: ${pokemon.hp}</li>
                    <li>Attack: ${pokemon.attack}</li>
                    <li>Defense: ${pokemon.defense}</li>
                    <li>Special Attack: ${pokemon.specialAttack}</li>
                    <li>Special Defense: ${pokemon.specialDefense}</li>
                    <li>Speed: ${pokemon.speed}</li>
                    <li>Total: ${pokemon.total}</li>
                </ul>
            </div>
        </div>
    `
}

function displayPokemonDetails(pokemon) {
    document.getElementById('pokemon-name').textContent = pokemon.name;
    document.getElementById('pokemon-image').src = pokemon.photo;
    document.getElementById('pokemon-number').textContent = `#${pokemon.pNumber}`;
    const detailList = document.getElementById('pokemon-details');
    const detailsContainer = document.getElementById('pokemon-details');
    const detailsHTML = convertPokemonDetailToHtml(pokemon);

    detailsContainer.innerHTML = detailsHTML;
}

loadPokemonDetails();

