import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

import { ThemeContext } from '../context/ThemeContext';
import { FavoriteContext } from '../context/FavoriteContext';

import CurrencyToggle from '../components/CurrencyToggle';
import CoinDesc from '../components/CoinDesc';
import FavoriteCoin from '../components/FavoriteCoin';

import '../style/Favorite.css';

const Favorite = () => {
    const {theme} = useContext(ThemeContext);
    const {currency, currencySymbol, currencyToggler, getOrder, order, favoriteList, removeFavorite} = useContext(FavoriteContext);

    const [favoriteCoins, setFavoriteCoins] = useState([]);


    useEffect( () => {
        const fetchData = () => {
            axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${favoriteList.join(",")}&order=${order}&per_page=100&page=1&sparkline=false`)
            .then(res => {
                setFavoriteCoins(res.data);
            })
        }

        if (favoriteList.length > 0) {
            fetchData();
        } else {
            setFavoriteCoins([]);
        }
    }, [currency, order, favoriteList]);
    
    
    let renderFavorite ;
    if(favoriteList.length !== 0) {
        renderFavorite = 
        <div className="favoriteCoins">
            <table className="favoriteCoinBloc">
                <thead>
                    <CoinDesc getOrder={getOrder}/>
                </thead>

                <tbody>
                    {favoriteCoins.map(coin => {
                        return (
                            <FavoriteCoin
                                key={coin.id} 
                                id={coin.id} 
                                name={coin.name} 
                                image={coin.image} 
                                symbol={coin.symbol}
                                price={coin.current_price}
                                volume={coin.total_volume}
                                priceChange={coin.price_change_percentage_24h}
                                marketcap={coin.market_cap}
                                currencySymbol={currencySymbol}
                                favoriteList={favoriteList}
                                removeFavorite={removeFavorite}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    } else {
        renderFavorite = <div className="noFavorites">Aucun favoris</div>
    }
    
    
        
    return (
        <div className={theme ? 'favorite dark' : 'favorite light'}>
            <div className="tools">
                <NavLink to="/CryptoTracker" className="arrowLink">
                    <i className="fas fa-arrow-left"></i>
                </NavLink>

                <CurrencyToggle currencyToggler={currencyToggler}/>
            </div>

            <h1 className="titleFavorite">Favoris</h1>
            
            {renderFavorite}
        </div>
    );
};

export default Favorite;