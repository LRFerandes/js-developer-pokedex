const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const detail = document.getElementById('button_detail')

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];






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

detail.addEventListener('click', function (){
    const input = document.getElementById('input')

    // Abrir o modal quando o botão for clicado
    modal.style.display = "block";

    
    pokeApi.getPokemomDetail(input.value)
    
    


})

// Fechar o modal quando o usuário clicar no botão 'x'
span.onclick = function() {
    modal.style.display = "none";
  }

// Fechar o modal quando o usuário clicar fora do modal
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }