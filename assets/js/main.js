const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreBtn');
const limit = 6;
let offset = 0;
const maxRecords = 1015;

function convertPokemonToHtml(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.pNumber}</span>
        <a href="detalhes.html?id=${pokemon.pNumber}" class="name">${pokemon.name}</a>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li> 
    `
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecord = offset + limit;

    if(qtdRecord >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    }else{
        loadPokemonItens(offset, limit);
    }
})