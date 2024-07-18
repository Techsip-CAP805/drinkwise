import React, { createContext, useContext, useState } from 'react'; // Add React to the import statement
const drinkData = require('../data/drinkData.json');
const locationData = require('../data/locationData.json');
const customerData = require('../data/customerData.json');
const ingredientsData = require('../data/ingredientsData.json');

const DrinkContext = createContext();

export const useDrinkContext = () => {
  return useContext(DrinkContext);
}

const DrinkProvider = ({ children }) => {
  const [locations, setLocations] = useState(locationData);
  const [drinks, setDrinks] = useState(drinkData);
  const [customers, setCustomers] = useState(customerData);
  const [ingredients, setIngredients] = useState(ingredientsData);

  const drinkContextObject = {
    locations,
    setLocations,
    drinks,
    setDrinks,
    customers,
    setCustomers,
    ingredients,
    setIngredients
  }

  return (
    <DrinkContext.Provider value={drinkContextObject}>
      {children}
    </DrinkContext.Provider>
  );
};

export { DrinkContext, DrinkProvider };
