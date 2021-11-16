import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const FavoriteContext = createContext();

const FavoriteContextProvider = (props) => {
    const [coins, setCoins] = useState([]);
    const [currency, setCurrency] = useState('eur');
    const [currencySymbol, setCurrencySymbol] = useState('€');
    const [order, setOrder] = useState('market_cap_desc');
    const [favoriteList, setfavoriteList] = useState([]);

    useEffect( () => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=250&page=1&sparkline=false`)
        
        .then(res => {
            setCoins(res.data);
        })
        .catch(error => console.log(error));
    }, [currency, order]);


    const currencyToggler = () => {
        currency === 'eur' ? setCurrency('usd') : setCurrency('eur');
        currencySymbol === '€' ? setCurrencySymbol('$') : setCurrencySymbol('€');
    }
    

    const getOrder = e => {
       setOrder(e.target.value)
    }

    const addFavorite = (coin) => {
        const newFavoriteList = [...favoriteList, coin];
        setfavoriteList(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
    }

    const removeFavorite = (coin) => {
		const newFavoriteList = favoriteList.filter(
			(favorite) => favorite !== coin
            
		);
		setfavoriteList(newFavoriteList);
		saveToLocalStorage(newFavoriteList);
	};

    const saveToLocalStorage = (items) => {
        localStorage.setItem('FavoritesCoin', JSON.stringify(items));
    };

    useEffect(() => {
		const coinFavorites = JSON.parse(
			localStorage.getItem('FavoritesCoin')
		);

		if (coinFavorites) {
			setfavoriteList(coinFavorites);
		}
	}, []);


    return (
        <FavoriteContext.Provider value={{coins, currency,  currencySymbol, currencyToggler, getOrder, order, favoriteList, addFavorite, removeFavorite}}>
            {props.children}
        </FavoriteContext.Provider>
    );
};

export default FavoriteContextProvider;