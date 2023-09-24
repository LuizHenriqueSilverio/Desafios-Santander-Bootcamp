const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.pNumber = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type1] = types;

    pokemon.types = types;
    pokemon.type = type1;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0 , limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((jsonBody) => { 
                return jsonBody.results;
            })
            .then((pokemons) => {
                return pokemons.map(pokeApi.getPokemonDetail);
            })
            .then((detailRequests) => {
                return Promise.all(detailRequests);
            })
            .then((pokemonDetails) => {
                return pokemonDetails;
            })
            .catch((error) => {
                console.error(error);
            });
}