function convertPokemonTypesToHtml(pokemonTypes) {
    return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon">
        <span class="number">#${pokemon.order}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${convertPokemonTypesToHtml(pokemon.types).join('')}
            </ol>
            <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
        </div>
    </li> 
    `
}

const pokemonList = document.getElementById('pokemonList');

// O próximo then sempre recebe o retorno do anterior 
pokeApi.getPokemons().then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('');
    })
    .finally(() => {
        console.log('Requisição concluída!');
    });