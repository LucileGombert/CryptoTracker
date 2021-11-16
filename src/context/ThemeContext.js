import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
    const [theme, setTheme] = useState(true);
   
    const toggleTheme = () => {
        const newTheme = (!theme)
        setTheme(newTheme)
        saveToLocalStorage(newTheme);
    }
    
    const saveToLocalStorage = (item) => {
        localStorage.setItem('Theme dark ?', JSON.stringify(item));
    };

    useEffect(() => {
		const themeColor = JSON.parse(
			localStorage.getItem('Theme dark ?')
		);
		setTheme(themeColor);
	}, []);

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;