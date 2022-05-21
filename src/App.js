import React, { useState } from 'react';

import './App.css';
import SearchBox from './components/SearchBox';
import Attributes from './components/Attributes';
import Footer from './components/Footer'


function App() {

  /*  Update time used to help with knowing when statistics were set  */
  const [pokemonStats, setPokemonStats] = useState({
    'updateTime': '',
    'Versions': [],
    'Moves': [],
    'Stats': []
});

  const handleClick = (e) => {
    if(e.type === 'click' || e.key === 'Enter'){
      let inputValue = document.getElementById('pokeInput').value.toLowerCase();
      document.getElementById('pokeInput').value = '';

      //Sanitize User Input to remove any special characters
      var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?~]/; /* eslint-disable-line */
      if(!format.test(inputValue)){

        fetchPokemon(inputValue)

      }

    }
  }


  const fetchPokemon = async (pokemon) => {

    let cachedPokemon = JSON.parse(localStorage.getItem(pokemon));

    if (cachedPokemon){

      let cachedTime = new Date(cachedPokemon.cacheTime).getTime();
      let currentTime = new Date().getTime();
      let timeDifference = currentTime - cachedTime

      //Only Fetch is greater than 2 minutes -> 120000 ms
      if(timeDifference < 120000) {

        decipherFetch(cachedPokemon, pokemon)
        return;
      }
  }

    try {
        
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        if (!res.ok){
            throw new Error(`HTTP error ${res.status}`)
        }

        const data = await res.json()
        
        .then((data) => {

            decipherFetch(data, pokemon)

        })

    } catch(e) {
      document.getElementById('loadHeader').innerHTML = "Try Another Pokemon"

    }


}

  const decipherFetch = (obj, pokeName) => {
    let pokeStats = {
        updateTime: "",
        Versions: [],
        Moves: [],
        Stats: []
    }

    let game_indices = obj.game_indices;
    let moves = obj.moves;
    let stats = obj.stats;
    pokeStats.updateTime = new Date().getTime();

    game_indices.forEach(element => {
        pokeStats.Versions.push(element.version.name);
    });
    moves.forEach(m => {
        pokeStats.Moves.push(m.move.name);
    })
    stats.forEach(s => {
        pokeStats.Stats.push(`${s.stat.name}-${s.base_stat}`)
    })

    localStorage.setItem(pokeName, JSON.stringify(
        {
            "cacheTime": pokeStats.updateTime,
            "game_indices": game_indices,
            "moves": obj.moves,
            "stats": obj.stats 
        })
    )

    setPokemonStats(pokeStats);
    
    //Update Header
    document.getElementById('loadHeader').innerHTML = pokeName[0].toUpperCase() + pokeName.slice(1) 

  }

  return (
    <div className='container'>
      <div style={{width: '100%', textAlign: 'center'}}>
        <h1 className='main font-effect-shadow-multiple'>Pokemon Application</h1>
        <SearchBox  clickChange={handleClick} />
        <h2 id='loadHeader' className= 'font-effect-emboss'>Select A Pokemon</h2>
        <div className='load-poke'>
          <Attributes name={'Versions'} attribute={pokemonStats.Versions}/>
          <Attributes name={'Moves'} attribute={pokemonStats.Moves}/>
          <Attributes name={'Stats'} attribute={pokemonStats.Stats}/>
        </div>
        <Footer />
      </div>
      
    </div>
  )

}

export default App;
