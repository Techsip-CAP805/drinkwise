// context/MyContext.js
import { createContext, useContext, useState } from 'react';
const drinkData = require('../data/drinkData.json');
const locationData = require('../data/locationData.json');
const customerData = require('../data/customerData.json');


const DrinkContext = createContext();

export const useDrinkContext = () => {
  return useContext(DrinkContext);
}

const DrinkProvider = ({ children }) => {


  const [locations, setLocations] = useState(locationData);
  const [drinks, setDrinks] = useState(drinkData);
  const [customers, setCustomers] = useState(customerData);

  const drinkContextObject = {
    locations,
    setLocations,
    drinks,
    setDrinks,
    customers,
    setCustomers
  }

  return (
    <DrinkContext.Provider value={drinkContextObject}>
      {children}
    </DrinkContext.Provider>
  );
};

export {DrinkContext, DrinkProvider};
