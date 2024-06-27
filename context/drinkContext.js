// context/MyContext.js
import { createContext, useState } from 'react';

const DrinkContext = createContext();

const DrinkProvider = ({ children }) => {


  const [locations, setLocations] = useState([
    {
        name: 'North York',
        operatingHour: "11:00am - 9:00pm",
        phoneNumber: "416-808-6969",
        image: '/boba.jpeg'
    },
    {
        name: 'Vaughan',
        operatingHour: "11:00am - 9:00pm",
        phoneNumber: "416-808-6969",
        image: '/boba.jpeg'
    },
    {
        name: 'Downtown',
        operatingHour: "11:00am - 9:00pm",
        phoneNumber: "416-808-6969",
        image: '/boba.jpeg'
    },
    {
        name: 'Toronto',
        operatingHour: "11:00am - 9:00pm",
        phoneNumber: "416-808-6969",
        image: '/boba.jpeg'
    },
    {
        name: 'Richmond Hill',
        operatingHour: "11:00am - 9:00pm",
        phoneNumber: "416-808-6969",
        image: '/boba.jpeg'
    },
    {
      name: 'Brantford',
      operatingHour: "11:00am - 9:00pm",
      phoneNumber: "416-808-6969",
      image: '/boba.jpeg'
  }
  ]);

  
  const [testing, setTesting] = useState("some string here");

  const drinkContextObject = {
    locations,
    setLocations,
    testing,
    setTesting
  }

  return (
    <DrinkContext.Provider value={drinkContextObject}>
      {children}
    </DrinkContext.Provider>
  );
};

export {DrinkContext, DrinkProvider};
