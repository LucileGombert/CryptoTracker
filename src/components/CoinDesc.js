import React, { useContext } from 'react';

import { ThemeContext } from '../context/ThemeContext';
import { FavoriteContext } from '../context/FavoriteContext';

import '../style/CoinDesc.css';

const CoinDesc = () => {
    const {theme} = useContext(ThemeContext);
    const {getOrder, order} = useContext(FavoriteContext);
    
    return (
        <tr className={theme ? 'coinDesc  dark' : 'coinDesc light'}>
            <th className={theme ? 'coinDescName  dark' : 'coinDescName light'}>Nom</th>
            <th className="coinDescSymbol">Symbole</th>
            <th className="coinDescPrice">Prix</th>
            <th><button onClick={getOrder} value='volume_desc' className={theme ? `coinDescVolume dark ${order === 'volume_desc' ? 'active' : ''}` : `coinDescVolume light ${order === 'volume_desc' ? 'active' : ''}`}><i className="fas fa-sort-down"></i> Volume</button></th>
            <th className="coinDescPercent">Prix 24h</th>
            <th><button onClick={getOrder} value='market_cap_desc'className={theme ? `coinDescMarketcap dark ${order === 'market_cap_desc' ? 'active' : ''}` : `coinDescMarketcap light ${order === 'market_cap_desc' ? 'active' : ''}`}><i className="fas fa-sort-down"></i> Market cap</button></th>
        </tr>
    );
};

export default CoinDesc;
