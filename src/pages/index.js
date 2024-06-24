import React, {useState, useContext} from 'react';
import {DrinkContext} from '../../context/drinkContext';

const Home = () => {

  const {locations, setLocations} = useContext(DrinkContext)



  //main page
  return (
    <>
    {locations.map((location)=> (
      <>
      <h2>{location.name}</h2>
      <p>{location.operatingHour}</p>
      <p>{location.phoneNumber}</p>
      </>
    ))}
    </>
  )
}

export default Home