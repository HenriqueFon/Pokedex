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
            console.log(pokemons)
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