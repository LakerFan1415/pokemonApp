import React from 'react';

const SearchBox = (props) => {

    const {clickChange} = props;

    return(
        <div>
        <input id='pokeInput' type='text' placeholder='Enter a Pokemon' onKeyPress={clickChange} />
        <button onClick={clickChange}>Submit</button>
        </div>
    )
}

export default SearchBox;