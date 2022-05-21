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
  };


const fetchPokemon = () =>{
    const getPokemonUrl = id =>'https://pokeapi.co/api/v2/pokemon/'+id;
    const pokemonArray=[];

    for(let pokemonId=1;pokemonId<=150;pokemonId++){
        pokemonArray.push(fetch(getPokemonUrl(pokemonId))
        .then(response=>response.json())) 
    }
    
    Promise.all(pokemonArray)
    .then(pokemons => {
        const listPokemons=pokemons.reduce((printar,pokemon)=>{
            const id=pokemon.id;
            const name=pokemon.name;
            const sprite=pokemon.sprites['front_default'];
            const typePrimaryColor=typeColor[pokemon.types[0].type.name];
            if(pokemon.types[1] != null) {
                const typeSecondColor=typeColor[pokemon.types[1].type.name];
            }
            printar+=
                    '<div class="card-section">'+
                    '<div class="card-upper" change-color>'+
                        '<div class="card-title">'+
                            '<ul>'+
                                '<li class="card-number"> Nº '+ id +'</li>' +
                                ' <li class="card-name">'+ name +'</li>'+
                            '</ul>'+
                        '</div>'+
                        '<div><img src='+ sprite +' class="imgPokemon"></div>'+
                    '</div>'+
                    '<div class="card-bottom">'+
                        '<div class="card-type" id="card-type" type-color>'+
                            
                        '</div>'+
                        '<div class="type-data">'+
                            '<ul>'+
                                
                            '</ul>'+
                        '</div>'+
                    '</div>'+
                '</div>'
                appendTypes(pokemon.types);
                //styleCard(typePrimaryColor);
            return printar;
        },'')
        const ul=document.querySelector('[data-js="pokedex"]');
        ul.innerHTML=listPokemons;
    },'')
}

let appendTypes = (types) =>{
    types.forEach((item) => {
        let span=document.createElement("SPAN");
        span.textContent=item.type.name;
        span.innerHTML=item.type.name;
        console.log(span);
        document.querySelector("card-type").appendChild(span)
    })
};
let styleCard = (color) => {
    let backgroundCardColor=document.querySelector('[change-color]');
    backgroundCardColor.className='card-upper';
    backgroundCardColor.style.backgroundColor=color;
    let cardTypeColor=document.querySelectorAll('[type-color] span');
    cardTypeColor.className='card-type';
    cardTypeColor[0].style.backgroundColor=color;
    cardTypeColor[1].style.backgroundColor=color2;
};
//chamada da função de trazer pokemons
fetchPokemon();