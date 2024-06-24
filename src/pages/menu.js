<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext } from "react";
import { useDrinkContext } from "../../context/drinkContext";
import { Box, Container, Text, Heading, VStack, Grid, GridItem, Flex, Stack, Spacer} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Menu = () => {
  const { drinks } = useDrinkContext();

  //want to see how many drinks, currently: 28
  console.log(drinks.length);

  // Extract unique categories from drinks
  const categories = Array.from(new Set(drinks.map(drink => drink.category)));

  return (
    <Box bg="#bcc8c3">
      <Navbar />
      <Container maxW="container.xl" py={10} pt={32} >
      <Heading mb={7} fontSize="2xl" color="gray.700" textDecoration="underline">
          Our Menu
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {categories.map((category, index) => (
            <GridItem key={index} bg='gray.200' borderRadius='lg' py={4} px={2}>
              <Box mx={4}>
                <Text fontSize="xl" fontWeight="bold" color="gray.700" textAlign="center">{category}</Text>
                <Box mt={4}>
                  {drinks.filter(drink => drink.category === category).map((drink, index) => (
                    <VStack key={index} align="start" mb={4}>
                      <Stack direction="row" align="center" spacing={4}>
                        <Box>
                          <Text fontSize="md" color="gray.700">{drink.drinkName}</Text>
                          <Text fontSize="sm" color="gray.500">{drink.description}</Text>
                        </Box>
                        <Box>
                          {drink.sizeOptions && (
                            <Text fontSize="sm" color="gray.500">
                               {drink.sizeOptions.map(size => size.size).join(", ")}
                            </Text>
                          )}
                        </Box>
                      </Stack>
                    </VStack>
                  ))}
                </Box>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};
=======
import React, {useState, useContext, useEffect} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import {Box, Container, Text} from '@chakra-ui/react';
// import '../styles/globals.css';

const menu = () => {

  const {drinks, setDrinks} = useContext(DrinkContext);
  const categories = drinks.map(drinks => drinks.category);
  const uniqueCategories = [... new Set(categories)];
  console.log(uniqueCategories);
  const [menu, setMenu] = useState({});

  useEffect (() => {
    //store items by category
    const catDrinks = uniqueCategories.reduce((acc, category) => {
      acc[category] = drinks.filter(item => item.category === category).slice(0,5);
      return acc;
    }, {});

    setMenu(catDrinks);
  }, []);

  

  return (
    <Box bg='white.100'>
    <Container centerContent p={6}>
    <Text fontSize='lg' fontWeight={700}>Menu</Text>
    <div className='menuPane'>
      {uniqueCategories.map((category) => (
        <div className = "menuCategory" key={category}>
          <Text fontSize='md' fontWeight={700}>{category}</Text>
          <table>
            {menu[category] && menu[category].map((item) => (
                <tr key={item.drinkId}>
                  <td>{item.drinkName}</td>
                  <td>{item.sizeOptions.map(size=> size.size).join(',')}</td>
                  {/* <td>{item.basePrice.toFixed(2)} CAD</td> */}
                </tr>
              ))}
          </table>
        </div>
      ))}
    </div>
    </Container>  
    </Box>

    // <Box bg='green.100'>
    //   <Container centerContent p={6}>
    //     <Text fontSize='lg' fontWeight={700}>Drinks</Text>
    //     {drinks.map((drinks, index)=> (
    //       <Box bg='blue.100'>
    //         <div key={index}>
    //         <h2>{drinks.drinkName}</h2>
    //         <p>{drinks.category}</p>
    //         <p>{drinks.basePrice}</p>
    //         </div>
    //       </Box>
    //     ))}
    //   </Container>
    // </Box>
  )
}
>>>>>>> 2495937 (menu page - version 1)

export default Menu;
=======
import React from 'react'

const menu = () => {
  return (
    <div>menu</div>
  )
}

export default menu
>>>>>>> 93d171d (menu push demo)
