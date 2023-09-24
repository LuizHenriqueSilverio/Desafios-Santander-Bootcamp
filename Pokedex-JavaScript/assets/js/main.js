function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.pNumber}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li> 
    `
}

const pokemonList = document.getElementById('pokemonList');

// O próximo then sempre recebe o retorno do anterior 
pokeApi.getPokemons().then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToHtml).join('');
    });