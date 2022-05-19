import { useEffect } from 'react';

const LoadPokemon = (props) => {

    const {pokemon, prevPokemon, setPrevPokemon , statsTime, setPokemonStats} = props;

    let pokeStats = {
        updateTime: "",
        Versions: [],
        Moves: [],
        Stats: []
    }

    //Put in Check to prevent multiple requests -> Makes 4 requests
    useEffect(() => {
            fetchingPoke();
    })

    /*
    const handleSelectFocus = (e) => {
        statistics(pokeStats);
        document.getElementById('theSelect').style.display = 'none';
    }

    */

   
    const fetchingPoke = async () => {

        let lsPokemon = JSON.parse(localStorage.getItem(pokemon));

        if(!pokemon){
            return;
        }

        //Read From Local Storage
        if(localStorage.getItem(pokemon)){


            /*Check time of request
              If request longer than 2 min (120,000 ms) -> send another request  
            */

            //FINISH THIS SECTION -> SET WHEN NEED TO MAKE ANOTHER REQUEST TIME IS IS TOO LONG  

           let cachedTime = new Date(JSON.parse(localStorage.getItem(pokemon)).cacheTime).getTime();
           let currentTime = new Date().getTime();
           
           let timeDifference = currentTime - cachedTime
           console.log(timeDifference) 

           if(timeDifference > 120000){

                decipherFetch(lsPokemon, "No")

                return;

           }

           
        }


        try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

        if (!res.ok) {
            throw new Error(`HTTP error ${res.status}`)
        }

        const data = await res.json();

        decipherFetch(data);

        } catch (error) { 
            document.getElementById('theSelect').value = 'no';
            document.getElementsByClassName('loadHeader')[0].innerHTML = 'Try Another Pokemon...';
            document.getElementById('theSelect').focus();
        }    
    }    

    /*  setLS will determine whether or not to set local storage   */
    const decipherFetch = (obj, setLS = 'Yes') => {
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


        /* Caching Request in Local Storage */
        if(setLS == "Yes") {

        localStorage.setItem(pokemon, JSON.stringify(
            {
                "cacheTime": pokeStats.updateTime,
                "game_indices": game_indices,
                "moves": obj.moves,
                "stats": obj.stats 
            }
        ))

        console.log('Done')

        }

        // Update Statistics if pokemon is different 
        if(prevPokemon != pokemon){
            setPokemonStats(pokeStats);
            setPrevPokemon(pokemon);
        }
        

        

        /* Update Statistics if pokemon is different 
        if(prevPokemon != pokemon) {
            setPokemonStats(pokeStats);
            setPrevPokemon(pokemon);
        }
        */
        

        //document.getElementById('theSelect').focus();
    
    }



            return (
                <div>
                    <h2 className='loadHeader font-effect-emboss'>{!pokemon
                    ? 'Pick A Pokemon...'
                    : pokemon[0].toUpperCase() + pokemon.slice(1)}</h2>
                    <select id='theSelect' >
                        <option value='no'>Loading...</option>
                        <option value='yes'></option>
                    </select>
                </div>
            )
    } 

            






export default LoadPokemon;