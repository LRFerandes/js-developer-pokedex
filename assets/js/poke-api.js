
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type


    const st = pokeDetail.stats.map((typeSlot) => typeSlot.base_stat)
    pokemon.stats = st

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

function cardPokemom(data){
    const pokemonCard = new PokemomCard()
            pokemonCard.name = data.name
            pokemonCard.weight = data.weight
            pokemonCard.height = data.height
            pokemonCard.photo = data.sprites.other.dream_world.front_default
            pokemonCard.stats = data.stats.map((typeSlot) => typeSlot.base_stat)
            pokemonCard.types = data.types.map((typeSlot) => typeSlot.type.name)
            pokemonCard.ability = data.abilities.map((typeSlot) => typeSlot.ability.name)
            pokemonCard.Moves = data.moves.map((typeSlot) => typeSlot.move.name)



            return pokemonCard
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}



pokeApi.getPokemomDetail = (name) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${name}/`

    return fetch(url)
        .then((response) => response.json())
        .then(cardPokemom)
        
}
