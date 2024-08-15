import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';

const drinkData = require('../data/drinkData.json');
const locationData = require('../data/locationData.json');
const customerData = require('../data/customerData.json');
const ingredientsData = require('../data/ingredientsData.json');
const employeeData = require('../data/employeeData.json');
const toppingData = require('../data/toppingData.json');

const DrinkContext = createContext();

export const useDrinkContext = () => {
  return useContext(DrinkContext);
}

// Cart reducer to manage the cart state
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item, index) => index !== action.index);
    case 'UPDATE_CART_ITEM':
      return state.map((item, index) => 
        index === action.index ? { ...item, ...action.payload } : item
      );
    default:
      return state;
  }
};

const DrinkProvider = ({ children }) => {
  const [locations, setLocations] = useState(locationData);
  const [drinks, setDrinks] = useState(drinkData);
  const [customers, setCustomers] = useState(customerData);
  const [ingredients, setIngredients] = useState(ingredientsData);
  const [employees, setEmployees] = useState(employeeData);
  const [toppings, setToppings] = useState(toppingData);
  const [total, setTotal] = useState(0);
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [lastVisited, setLastVisited] = useState("");
  const [prevVisitedStore, setPrevVisitedStore] = useState("");

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    console.log("Loaded cart from localStorage:", savedCart); // Log what was loaded
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Parsed cart data:", parsedCart); // Log the parsed cart
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error("Failed to parse saved cart from localStorage:", error);
      }
    } else {
      console.log("No saved cart found in localStorage."); // Log if no saved cart is found
    }
  }, []); // Ensure this effect only runs once on mount

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) { // Ensure we only save non-empty carts
      console.log("Saving cart to localStorage:", cart); // Log what is being saved
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [cart]);

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
    setEmployees,
    toppings,
    setToppings,
    cart,
    dispatch,  // Note: We now pass the dispatch function instead of setCart
    total,
    setTotal,
    lastVisited,
    setLastVisited,
    prevVisitedStore,
    setPrevVisitedStore
  };

  return (
    <DrinkContext.Provider value={drinkContextObject}>
      {children}
    </DrinkContext.Provider>
  );
};

export { DrinkContext, DrinkProvider };
