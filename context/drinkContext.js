// context/MyContext.js
import { createContext, useState } from 'react';
const drinkData = require('../data/drinkData.json');


const DrinkContext = createContext();


const DrinkProvider = ({ children }) => {

  const [locations, setLocations] = useState();
  const [drinks, setDrinks] = useState(drinkData);

  const drinkContextObject = {
    locations,
    setLocations,
    drinks,
    setDrinks
  }

  return (
    <DrinkContext.Provider value={drinkContextObject}>
      {children}
    </DrinkContext.Provider>
  );
};

export {DrinkContext, DrinkProvider};
