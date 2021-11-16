import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';

import '../style/CoinData.css';

const CoinData = ({coin, currency}) => {
    const {theme} = useContext(ThemeContext);


    const renderData = () => {
        if (coin) {
          return (
            <div className="coinDetails">
                <div className={theme ? 'coinPresentationBorder dark' : 'coinPresentationBorder light'}>
                    <div className="coinPresentation">
                        <div className="coinTitle">
                            <h1>{coin.name}</h1>
                            <h2>{coin.symbol}</h2>
                        </div>
                        
                        <img src={coin.image} alt={coin.name}/>
                    </div>
                </div>

                <div className={theme ? 'coinDataBorder dark' : 'coinDataBorder light'}>
                    <div className="coinData">
                        <div className="info">
                            <p><span className="strong">Prix :</span> {coin.current_price.toLocaleString()} {currency}</p>
                        </div>

                        <div className="info">
                            {coin.price_change_percentage_24h < 0 ? (
                                <p><span className="strong">Evolution prix (24h) :</span> <span className="red">{coin.price_change_percentage_24h.toFixed(2)} %</span></p>
                            ) : (
                                <p><span className="strong">Evolution (24h) :</span> <span className="green"> +{coin.price_change_percentage_24h.toFixed(2)} %</span></p>
                            )}
                        </div>

                        <div className="info">
                            <p><span className="strong">Prix min. (24h) :</span> {coin.low_24h.toLocaleString()} {currency}</p>
                        </div>

                        <div className="info">
                            <p><span className="strong">Prix max. (24h) :</span> {coin.high_24h.toLocaleString()} {currency}</p>
                        </div>

                        <div className="info">
                            <p><span className="strong">Jetons en circulation :</span> {coin.circulating_supply.toLocaleString()}</p>
                        </div>

                        <div className="info">
                            <p><span className="strong">Total jetons :</span> {coin.total_supply !== null ? coin.total_supply.toLocaleString() : '...'}</p>
                        </div>

                        <div className="info">
                            <p><span className="strong">Market Cap :</span> {coin.market_cap.toLocaleString()} {currency}</p>
                        </div>

                        <div className="info">
                            <p><span className="strong">Volume (24h) :</span> {coin.total_volume.toLocaleString()} {currency}</p>
                        </div>
                    </div>
                </div>
            </div>
          );
        }
      };
    

    return (
        <div>
            {renderData()}
        </div>
    );
};

export default CoinData;