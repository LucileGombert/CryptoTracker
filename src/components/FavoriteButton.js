import React from 'react';
import { NavLink } from 'react-router-dom';

import '../style/FavoriteButton.css';

const FavoriteButton = () => {
    return (
        <NavLink to="/CryptoTracker/favoris" className="favoriteLink">
            <div className="favoriteIcon">
                <i className="far fa-heart favoriteButton favoriteEmpty"></i>
                <i className="fas fa-heart favoriteButton favoriteFilled"></i>  
            </div>
        </NavLink>
        
    );
};

export default FavoriteButton;