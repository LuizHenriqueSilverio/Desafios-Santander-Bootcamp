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
                <ul class="attributes">
                    <li>Height: ${pokemon.height * 10} Centimeters</li>
                    <li>Weight: ${pokemon.weight / 10} Kgs</li>
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
    const pokemonName = document.getElementById('pokemon-name');
    const pokemonImage = document.getElementById('pokemon-image');
    const pokemonHeader = document.getElementById('pokemon-header');
    document.getElementById('pokemon-number').textContent = `#${pokemon.pNumber}`;

    pokemonName.textContent = pokemon.name;
    pokemonImage.src = pokemon.photo;

    const detailList = document.getElementById('pokemon-details');
    const detailsContainer = document.getElementById('pokemon-details');
    const detailsHTML = convertPokemonDetailToHtml(pokemon);

    detailsContainer.innerHTML = detailsHTML;
    pokemonName.classList.add(pokemon.type);
    pokemonImage.classList.add(pokemon.type);
    pokemonHeader.classList.add(pokemon.type);
}

loadPokemonDetails();

