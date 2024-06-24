import React, {useState, useContext} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import {Box, Container, Text} from '@chakra-ui/react';

const Home = () => {

  const {locations, setLocations} = useContext(DrinkContext)



  //main page
  return (
    <Box bg='red.100'>
      <Container centerContent p={6}>
        <Text fontSize='lg' fontWeight={700}>Just testing React Context state</Text>
        <br/>
        {locations.map((location, index)=> (
          <div key={index}>
          <h2>{location.name}</h2>
          <p>{location.operatingHour}</p>
          <p>{location.phoneNumber}</p>
          </div>
        ))}
      </Container>
    </Box>
  )
}

export default Home