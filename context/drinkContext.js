// context/MyContext.js
import { createContext, useContext, useState } from 'react';
const drinkData = require('../data/drinkData.json');


const DrinkContext = createContext();

export const useDrinkContext = () => {
  return useContext(DrinkContext);
}

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
