import React from 'react'; 

import '../style/SearchBar.css';


const SearchBar = ({handleChange}) => {
  
  return (
    <div className="coinSearch">
        <form>
            <input type="text" placeholder="Rechercher une cryptomonnaie" className="coinInput" onChange={handleChange}/>
        </form>
    </div>
  );
}

export default SearchBar;
