import React, { useContext, useState } from 'react'; 

import { ThemeContext } from '../context/ThemeContext';
import { FavoriteContext } from '../context/FavoriteContext';

import CurrencyToggle from '../components/CurrencyToggle';
import LightToggle from '../components/LightToggle';
import FavoriteButton from '../components/FavoriteButton';
import SearchBar from '../components/SearchBar';
import CoinDesc from '../components/CoinDesc';
import Coin from '../components/Coin';

import '../style/Home.css';


function Home() {
  const {theme} = useContext(ThemeContext);
  const {coins, currencySymbol, currencyToggler, getOrder, addFavorite} = useContext(FavoriteContext);
  
  const [search, setSearch] = useState('');
  

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )


  return (
    <div className={theme ? 'home dark' : 'home light'}>
      <div className="tools">
        <CurrencyToggle currencyToggler={currencyToggler}/>

        <div className="toolsBloc">
          <FavoriteButton/>
          <LightToggle/>
        </div>
      </div>

      <h1>Crypto tracker</h1>  
      
      <SearchBar handleChange={handleChange}/>

     
      <div className="coins">
        <table className="coinBloc">
          <thead>
              <CoinDesc getOrder={getOrder}/>
          </thead>
          <tbody>
            {filteredCoins.map(coin => {
              return (
                <Coin 
                  key={coin.id} 
                  id={coin.id} 
                  name={coin.name} 
                  image={coin.image} 
                  symbol={coin.symbol}
                  volume={coin.total_volume}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                  marketcap={coin.market_cap}
                  currencySymbol={currencySymbol}
                  addFavorite={addFavorite}
                />
              )
            })}
          </tbody>
        </table>
      </div>
      
      <p className="sign">Made with ♡ by Lucile Gombert</p>
    </div>
  );
}

export default Home;