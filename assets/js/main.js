const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const detail = document.getElementById('button_detail')

var modal = document.getElementById("myModal");
var modalContent = document.getElementById("modal-content-text");
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

function convertPokemomToHtml(pokemonCard){
    return `
    <div class="card_name">
    
        <p id="namePokemomCard" class="nameCard">  ${pokemonCard.name} </p>

        <div class="card_name_body">

            <p class="bodyStats"> wgt: 
            <br>
            ${pokemonCard.weight}
            </p>

            <p class="bodyStats"> hgt: 
            <br>
            ${pokemonCard.height}
            </p>
        </div>
    </div>
    <hr>
    <div class="card_stats">
        <ul class="container">
            <li class="column">
                <p>HP: ${pokemonCard.stats[0]}</p>
                <p>SAT:  ${pokemonCard.stats[1]}}</p>
            </li>
            <li class="column">
                <p>ATT:  ${pokemonCard.stats[2]}</p>
                <p>SDF:  ${pokemonCard.stats[3]}</p>
            </li>
            <li class="column">
                <p>DEF:  ${pokemonCard.stats[4]}</p>
                <p>SPD:  ${pokemonCard.stats[5]}</p>
            </li>
        </ul>
    
    </div>
    <hr>
    <div class="card_moves">
        <div class="card_moves_moves">
            <p>MOVES</p>
            <p> ${pokemonCard.Moves[0]}</p>
            <p> ${pokemonCard.Moves[1]}</p>
            <p> ${pokemonCard.Moves[2]}</p>
            <p> ${pokemonCard.Moves[3]}</p>
            <p> ${pokemonCard.Moves[4]}</p>
        </div>
        <div>
            <div class="card_moves_abilities">
                <p>ABILITIES</p>
                ${pokemonCard.ability.map((ability) => `<p>${ability}</p>`).join('')}
            </div>
            <div class="card_moves_type">
                <p>TYPE</p>
                ${pokemonCard.types.map((type) => `<p>${type}</p>`).join('')}
            </div>
        </div>
    </div>
    <hr>
    
    
     `
}

function detailPoke(pokemon){

    pokeApi.getPokemomDetail(pokemon).then((pokemonCard) => {
        const newHtml = convertPokemomToHtml(pokemonCard)
        modalContent.innerHTML = newHtml
        }
    )
        
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

    
   detailPoke(input.value)
    


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