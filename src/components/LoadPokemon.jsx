import { useEffect } from 'react';

const LoadPokemon = (props) => {

    const {pokemon, statistics} = props;

    let pokeStats = {
        Versions: [],
        Moves: [],
        Stats: []
    }

    var needFetched = true;

    useEffect(() => {
        if(pokemon && needFetched){
            fetchingPoke();
        }
    })

    const handleSelectFocus = (e) => {
        statistics(pokeStats);
        document.getElementById('theSelect').style.display = 'none';
    }

    const fetchingPoke = () => {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        fetch(url)
        .then(response => response.json())
        .then(response => {
        
        decipherFetch(response);

        document.getElementById('theSelect').value = 'yes';
        })
        .catch(error => {
            document.getElementById('theSelect').value = 'no';
            document.getElementsByClassName('loadHeader')[0].innerHTML = 'Try Another Pokemon...';
            document.getElementById('theSelect').focus();
            })
        }

    const decipherFetch = (obj) => {
        let game_indices = obj.game_indices;
        let moves = obj.moves;
        let stats = obj.stats;
        game_indices.forEach(element => {
            pokeStats.Versions.push(element.version.name);
        });
        moves.forEach(m => {
            pokeStats.Moves.push(m.move.name);
        })
        stats.forEach(s => {
            pokeStats.Stats.push(`${s.stat.name}-${s.base_stat}`)
        })
        document.getElementById('theSelect').focus();
    
    }



            return (
                <div>
                    <h2 className='loadHeader font-effect-emboss'>{!pokemon
                    ? 'Pick A Pokemon...'
                    : pokemon[0].toUpperCase() + pokemon.slice(1)}</h2>
                    <select id='theSelect' onFocus={handleSelectFocus}>
                        <option value='no'>Loading...</option>
                        <option value='yes'></option>
                    </select>
                </div>
            )
    } 

            






export default LoadPokemon;