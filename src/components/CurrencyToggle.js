import React from 'react';
import '../style/CurrencyToggle.css';

const CurrencyToggle = ({currencyToggler}) => {
    return (
        <div className="toggle-switch toggle-switch-rounded">
            <input type="checkbox" name="switch-name" id="switch-id" onChange={() => currencyToggler()}/>
            <label htmlFor="switch-id" data-eur="€" data-usd="$"></label>
        </div>
    );
};

export default CurrencyToggle;
