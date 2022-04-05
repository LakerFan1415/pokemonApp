import React from 'react';

const Attributes = (props) => {

    const { name, attribute} = props;

    const splitAttribute = attribute.map((el) => {
        return <li>{(el[0].toUpperCase() + el.slice(1) + ' ')}</li>
    })

    if (attribute){
        return (
            <div className='attr-div'>
                <h2>{name}</h2>
                {typeof(attribute[0]) == "string"
                ?
                <ul className='attr-list'>
                    {splitAttribute}
                </ul>
                :
                `No ${name}...`
                }
            </div>


        )
    } else {
        return null;
    }
}

export default Attributes;