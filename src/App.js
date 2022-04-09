import React, { useState } from 'react';

import './App.css';
import LoadPokemon from './components/LoadPokemon';
import SearchBox from './components/SearchBox';
import Attributes from './components/Attributes';
import Footer from './components/Footer'


function App() {

  const [pokemon, setPokemon] = useState('');

  const [prevPokemon, setPrevPokemon] = useState('');

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
    document.getElementById('theSelect').style.display = 'initial';
    setPrevPokemon(pokemon);
    setPokemon(inputValue);

    }
  }

  return (
    <div className='container'>
      <div style={{width: '100%', textAlign: 'center'}}>
        <h1 className='main font-effect-shadow-multiple'>Pokemon Application</h1>
        <SearchBox  clickChange={handleClick} />
        <LoadPokemon pokemon={pokemon} prevPokemon={prevPokemon} statsTime={pokemonStats.updateTime} setPokemonStats={setPokemonStats} />
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
