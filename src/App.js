import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FavoriteContextProvider from './context/FavoriteContext';
import ThemeContextProvider from './context/ThemeContext';
import Home from './pages/Home';
import OneCoin from './pages/OneCoin';
import Favorite from './pages/Favorite';


const App = () => {
  return (
    <div>
      <FavoriteContextProvider>
        <ThemeContextProvider>
          <Router>
            <Switch>
              {/* <Route path='/' exact component={Home} />
              <Route path='/coin/:id' component={OneCoin} />
              <Route path='/favorite' exact component={Favorite} /> */}

              {/* Pour déploiement */}
              <Route path='/CryptoTracker' exact component={Home} />
              <Route path='/CryptoTracker/coin/:id' component={OneCoin} /> 
              <Route path='/CryptoTracker/favorite' exact component={Favorite} />
            </Switch>
          </Router>
        </ThemeContextProvider>
      </FavoriteContextProvider>
    </div>
  );
};

export default App;

