import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ThemeContext } from '../context/ThemeContext';
import { FavoriteContext } from '../context/FavoriteContext';

import '../style/Coin.css';

const FavoriteCoin = ({ id, name, image, symbol, price, volume, priceChange, marketcap, currencySymbol, removeFavorite }) => {
    const {theme} = useContext(ThemeContext);
    const {favoriteList} = useContext(FavoriteContext);

    let button;
    if(favoriteList.includes(id)) {
        button = <i onClick={(e) => {removeFavorite(id)}} className="fas fa-heart-broken removeFavorite"></i>
    }
    

    return (
        <tr className="coin">
            <td className={theme ? 'coinBlocImage  dark' : 'coinBlocImage light'}>
                <img src={image} alt={name}/>
                <h2 className="coinName">{name}</h2>
            </td>

            <td className="coinSymbol">{symbol}</td>

            <td className="coinPrice">{price.toLocaleString()} {currencySymbol}</td>

            <td className="coinVolume">{volume.toLocaleString()} {currencySymbol}</td>

            {priceChange < 0 ? (
                <td className="coinPercent red">{priceChange.toFixed(2)} %</td>
            ) : (
                <td className="coinPercent green">{priceChange.toFixed(2)} %</td>
            )}

            <td className="coinMarketcap">{marketcap.toLocaleString()} {currencySymbol}</td>

            <td className={theme ? 'coinView  dark' : 'coinView light'}>
                <NavLink to={`/coin/${id}`} className="link">
                    <i className="far fa-eye"></i>
                </NavLink>

                {button}
            </td>
        </tr>
    )
}

export default FavoriteCoin;
