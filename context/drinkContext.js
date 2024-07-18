// context/MyContext.js
import { createContext, useContext, useState } from 'react';
import React from "react";

const drinkData = require('../data/drinkData.json');
const locationData = require('../data/locationData.json');
const customerData = require('../data/customerData.json');
const ingredientsData = require('../data/ingredientsData.json');
const employeeData = require('../data/employeeData.json');


const DrinkContext = createContext();

export const useDrinkContext = () => {
  return useContext(DrinkContext);
}

const DrinkProvider = ({ children }) => {


  const [locations, setLocations] = useState(locationData);
  const [drinks, setDrinks] = useState(drinkData);
  const [customers, setCustomers] = useState(customerData);
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [employees, setEmployees] = useState(employeeData)

  const drinkContextObject = {
    locations,
    setLocations,
    drinks,
    setDrinks,
    customers,
    setCustomers,
    ingredients,
    setIngredients,
    employees,
    setEmployees
  }

  return (
    <DrinkContext.Provider value={drinkContextObject}>
      {children}
    </DrinkContext.Provider>
  );
};

export {DrinkContext, DrinkProvider};
  