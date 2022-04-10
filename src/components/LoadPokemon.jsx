import { useEffect } from 'react';

const LoadPokemon = (props) => {

    const {pokemon, prevPokemon, setPrevPokemon , statsTime, setPokemonStats} = props;

    let pokeStats = {
        updateTime: "",
        Versions: [],
        Moves: [],
        Stats: []
    }

    useEffect(() => {
            fetchingPoke();
    })

    /*
    const handleSelectFocus = (e) => {
        statistics(pokeStats);
        document.getElementById('theSelect').style.display = 'none';
    }

    */

    /*
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


    */
   
    const fetchingPoke = async () => {

        let lsPokemon = JSON.parse(localStorage.getItem(pokemon));

        if(!pokemon){
            return;
        }

        if(lsPokemon){


            /*Check time of request
              If request longer than 5 min (300,000 ms) -> send another request  
            */

            //FINISH THIS SECTION -> SET WHEN NEED TO MAKE ANOTHER REQUEST TIME IS IS TOO LONG  

           let cachedTime = new Date(lsPokemon.cacheTime).getTime();
           let currentTime = new Date().getTime();
           
           let timeDifference = currentTime - cachedTime
           console.log(timeDifference) 

           if(60000 > Math.abs(parseInt((cachedTime - currentTime)))){

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
            console.log(error)
        }    
    }    

    /*  setLS will determine whether or not to set local storage   */
    const decipherFetch = (obj, setLS = 'Yes') => {
        let game_indices = obj.game_indices;
        let moves = obj.moves;
        let stats = obj.stats;

        pokeStats.updateTime = new Date();

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
                "cacheTime": new Date(),
                "game_indices": game_indices,
                "moves": obj.moves,
                "stats": obj.stats 
            }
        ))

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