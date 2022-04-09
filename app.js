const fetchPokemon=()=>{
    //função que recebe um id e concatena na url
    //fetch é uma promise que retorna true caso funcione
    //e false caso falhe
    //then traz uma resposta do json caso funcione
    //response tbm é uma promise, logo usamos outra promise

    const getPokemonUrl = id =>'https://pokeapi.co/api/v2/pokemon/'+id;
    const pokemonPromises=[];//vetor para armazenar ids de pokemons
    
    
    for(let pokemonID=1;pokemonID<=150;pokemonID++){
        pokemonPromises.push(fetch(getPokemonUrl(pokemonID))
            .then(response=>response.json()))//retorno do pokemon e da push para ser salvo no array
            
    }
    
    Promise.all(pokemonPromises)//quando a pokemonPromises for concluída, then-então exiba os pokemons
        .then(pokemons=>{
            //console.log(pokemons)
            //accumulator seria o resultado
            const listPokemons=pokemons.reduce((accumulator,pokemon)=>{//para cada tipo de pokemon dentro do retorno de pokemon
                const types= pokemon.types.map(typeInfo=>typeInfo.type.name)
                accumulator+=
                            '<li class="card">'+
                            '<img class="card-image"' + types[0] + ' alt='+pokemon.name+' src='+pokemon.sprites["front_default"]+'/>'
                                '<h2 class="card-tittle">' + pokemon.id + pokemon.name + '</h2>' +
                                '<p class="card-subtitle">' + types.join(' | ') + '</p>'
                            +'</li>'
                return accumulator;
            },'')

            const ul=document.querySelector('[data-js="pokedex"]')
            console.log(ul);
        })

    /*const getPokemonUrl='https://pokeapi.co/api/v2/pokemon/150';

    fetch(getPokemonUrl)
        .then(response=>response.json())
        .then(pokemons=>{
            console.log(pokemons)
            console.log(getPokemonUrl)
        })*/
}

fetchPokemon();