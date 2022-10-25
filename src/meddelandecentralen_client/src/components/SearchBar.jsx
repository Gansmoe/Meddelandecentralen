import React from "react";
import { useState, useEffect } from 'react';


/**
 * React Component that renders a search box that can filter items from an array where each item is a definable component type. 
* @param {Array} props.list - An Array of objects that has properties which can be used for filtering.
* @param {String} props.placeholder - The default text string within the search box.
* @param {React.Component} props.Comp - Specifies what kind of React Component to draw for each list item.
* @param {*} props.filterprop - The property that should be used for filtering.
* @param {*} props.customkey - An optional prop if you require a specific id. Make sure they are unique!

 * @returns JSX.Element
 */

const SearchBar = ({ list, placeholder, Comp, filterprop, customkey, customProp, name }) => {
    const [items, setItems] = useState(list);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setItems(list);
    }, [list])

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (

        <div className="search-bar-container">
            <input className="search-bar-input" type="text" placeholder={placeholder} onChange={handleChange} />
            <div className="search-bar-items">
                {items.filter((entry) => {
                    if (searchTerm === '') {
                        console.log(entry);
                        return entry;
                    } else if (entry[filterprop].toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                        console.log(entry);
                        return entry;
                    } else return null;
                })
                    .map((entry, key) => {
                        return (
                            <div className='anim-fade' key={entry[customkey] ? entry[customkey] : key}>
                                <Comp message={entry} name={name} listitem={entry} customProp={customProp} />
                            </div>
                        );
                    })}
            </div>
        </div>
    )
}

export default SearchBar;