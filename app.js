const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
    steel: "#BFD2E6",
    dark:"#000000"
  };



//const pokeCard=document.querySelector('.card-section');
//pokeCard.addEventListener('click',(e)=> iniciaModal('modal'));


const fetchPokemon = () =>{
    const getPokemonUrl = id =>'https://pokeapi.co/api/v2/pokemon/'+id;
    const pokemonArray=[];

    for(let pokemonId=1;pokemonId<=151;pokemonId++){
        pokemonArray.push(fetch(getPokemonUrl(pokemonId))
        .then(response=>response.json())) 
    }
    
    Promise.all(pokemonArray)
    .then(pokemons => {
        const listPokemons=pokemons.reduce((printar,pokemon)=>{
            const id=pokemon.id;
            const name=pokemon.name;
            const sprite=pokemon.sprites['front_default'];

            printar+=
                `<div class="card-section">
                    <div class="card-upper" style="background:${getColorByType(pokemon.types[0].type.name)}">
                        <div class="card-title">
                            <ul>
                                <li class="card-number"> Nº ${id}</li>
                                 <li class="card-name">${name}</li>
                            </ul>
                        </div>
                        <div><img src='${sprite}' class="imgPokemon"/></div>
                    </div>
                    <div class="card-bottom">
                        <div class="card-type" id="card-type" type-color>
                            ${appendTypes(pokemon.types)}
                        </div>
                        <button class="modal-button" style="background:${getColorByType(pokemon.types[0].type.name)}" onclick="pokemonModal(${id})">more</button>
                    </div>
                </div>
                `
            return printar;
        },'')
        const ul=document.querySelector('[data-js="pokedex"]');
        ul.innerHTML=listPokemons;
    },'')
}



const searchPokemon = () =>{

    const namePokemon=document.getElementById('pokemonSearch').value;
    const namePokemonLower=namePokemon.toLowerCase();
    const getPokemonUrl = (namePokemon) =>`https://pokeapi.co/api/v2/pokemon/${namePokemon}`;
    
    fetch(getPokemonUrl(namePokemonLower))
    .then(res=>res.json())
    .then(pokemon=>{
        const id=pokemon.id;
        const name=pokemon.name;
        const sprite=pokemon.sprites['front_default']
        const  pokemonSearch=`<div class="card-section">
                <div class="card-upper" style="background:${getColorByType(pokemon.types[0].type.name)}">
                    <div class="card-title">
                        <ul>
                            <li class="card-number"> Nº ${id}</li>
                            <li class="card-name">${name}</li>
                        </ul>
                    </div>
                    <div><img src='${sprite}' class="imgPokemon"/></div>
                </div>
                <div class="card-bottom">
                    <div class="card-type" id="card-type" type-color>
                        ${appendTypes(pokemon.types)}
                    </div>
                </div>
            </div>`
        const ul=document.querySelector('[data-js="pokedex"]');
        ul.innerHTML=pokemonSearch;    
    })
    
}

let appendTypesSearch = (types) =>{
    types.forEach((item) => {
        let span=document.createElement("SPAN");
        span.textContent=item.type.name;
        span.innerHTML=item.type.name;
        console.log(span);
        document.querySelector("card-type").appendChild(span)
    })
};
let styleCardSearch = (color) => {
    let backgroundCardColor=document.querySelector('[change-color]');
    backgroundCardColor.className='card-upper';
    backgroundCardColor.style.backgroundColor=color;
    let cardTypeColor=document.querySelectorAll('[type-color] span');
    cardTypeColor.className='card-type';
    cardTypeColor[0].style.backgroundColor=color;
    cardTypeColor[1].style.backgroundColor=color2;
};


const appendTypes = (types) =>{
   const spans = types.map((item) => {
       const span=document.createElement("SPAN");
       span.textContent=item.type.name;
       span.innerHTML=item.type.name;
       span.style.backgroundColor=getColorByType(item.type.name); 
       
       return span;
    });
    const htmlSpans = spans.map(item => item.outerHTML).join('');
  
    return htmlSpans;
};


const getColorByType = type => {
   return color = typeColor[type]
}

function pokemonModal(name){
    const getPokemonUrl = (name) =>`https://pokeapi.co/api/v2/pokemon/${name}`;
    
    fetch(getPokemonUrl(name))
    .then(res=>res.json())
    .then(pokemon=>{
        console.log(pokemon)
        const id=pokemon.id;
        const name=pokemon.name;
        const sprite=pokemon.sprites['front_default'];
        const  pokemonSearch=`
            <div id="modal-card" class="modal-container">
                <div class="card-section-modal">
                    <button class="botao_fechar" onclick="fetchPokemon()">Fechar</button>
                    <div id="modal">
                        <div class="card-upper-modal" style="background:${getColorByType(pokemon.types[0].type.name)}">
                        <div class="card-title-modal">
                            <ul>
                                <li class="card-number-modal"> Nº ${id}</li>
                                <li class="card-name-modal">${name}</li>
                            </ul>
                        </div>
                        <div><img src='${sprite}' class="imgPokemon-modal"/></div>
                        </div>
                        <div class="card-bottom">
                            <div class="card-type" id="card-type" type-color>
                                ${appendTypes(pokemon.types)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
        const ul=document.querySelector('[data-js="pokedex"]');
        ul.innerHTML=pokemonSearch;    
    })
}

fetchPokemon();