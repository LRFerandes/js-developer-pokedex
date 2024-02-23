const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const button = document.getElementById('details_button')






const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">

                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>

            <div class="modal"> 
                <ol class="modal_list ${pokemon.type}">
                    <li ">hp:${pokemon.stats[0]}</li>
                    <li>attack:${pokemon.stats[1]}</li>
                    <li>defense:${pokemon.stats[2]}</li>
                    <li>special-attack:${pokemon.stats[3]}</li>
                    <li>special-defense:${pokemon.stats[4]}</li>
                    <li>speed:${pokemon.stats[5]}</li>
                </ol>
            </div>

        </li>
        
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//mudanças feitas por mim

button.addEventListener('click', function(){
    console.alert('funcionou')
})