import React from 'react';

const Attributes = (props) => {

    const { name, attribute} = props;

    const splitAttribute = (attr) => {
        var element = '';
        for (let i=0; i < attr.length; i++){
            element += (attr[i][0].toUpperCase() + attr[i].slice(1) + ' ');
        }
        return element;
    }

    if (attribute){
        return (
            <div id='attr-div'>
                <h2>{name}</h2>
                <p className='attr-info'>{typeof(attribute[0]) == "string"
                    ? splitAttribute(attribute)
                    : `No ${name}...`   
                }</p>
            </div>


        )
    } else {
        return null;
    }
}

export default Attributes;