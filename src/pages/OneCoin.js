import React, { useContext, useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom"; 
import axios from 'axios';

import { ThemeContext } from '../context/ThemeContext';

import CurrencyToggle from '../components/CurrencyToggle';
import HistoryChart from '../components/HistoryChart';
import CoinData from '../components/CoinData';

import '../style/OneCoin.css';

const OneCoin = () => {
    const {theme} = useContext(ThemeContext);
    const { id } = useParams();
    
    const [coin, setCoin] = useState({});
    const [currency, setCurrency] = useState('eur');
    const [currencySymbol, setCurrencySymbol] = useState('€');

    const formatData = (data) => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(2)
            }
        })
    }

    useEffect( () => {
        const fetchData = async () => {
            const [day, week, month, year, detail] = await Promise.all([
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=1`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=30`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=365`),
                axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            ])
            setCoin({day: formatData(day.data.prices), week: formatData(week.data.prices), month: formatData(month.data.prices), year: formatData(year.data.prices), detail: detail.data[0]});
        }
        fetchData();
        
    },[currency]);

 
    const currencyToggler = () => {
        currency === 'eur' ? setCurrency('usd') : setCurrency('eur');
        currencySymbol === '€' ? setCurrencySymbol('$') : setCurrencySymbol('€');
    }

    
    return (
        <div className={theme ? 'oneCoin dark' : 'oneCoin light'}>
            <div className="tools">
                <NavLink to="/CryptoTracker" className="arrowLink">
                    <i className="fas fa-arrow-left"></i>
                </NavLink>

                <CurrencyToggle currencyToggler={currencyToggler}/>
            </div>

            <h1 className="titlePage">{id}</h1>

            <CoinData coin={coin.detail} currency={currencySymbol}/>

            <HistoryChart data={coin} currency={currencySymbol}/>
        </div>


    );
    
};

export default OneCoin;



