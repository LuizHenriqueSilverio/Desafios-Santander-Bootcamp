const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.pNumber = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type1] = types;

    pokemon.types = types;
    pokemon.type = type1;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.hp = pokeDetail.stats[0].base_stat;
    pokemon.attack = pokeDetail.stats[1].base_stat;
    pokemon.defense = pokeDetail.stats[2].base_stat;
    pokemon.specialAttack = pokeDetail.stats[3].base_stat;
    pokemon.specialDefense = pokeDetail.stats[4].base_stat;
    pokemon.speed = pokeDetail.stats[5].base_stat;
    pokemon.total = calculateTotalStats(pokeDetail.stats);

    return pokemon;
}

function calculateTotalStats(stats) {
    return stats.reduce((total, stat) => total + stat.base_stat, 0);
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
