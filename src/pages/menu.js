<<<<<<< HEAD
<<<<<<< HEAD
import React, { useContext } from "react";
import { useDrinkContext } from "../../context/drinkContext";
import { Box, Container, Text, Heading, VStack, Grid, GridItem, Flex, Stack, Spacer} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
=======
import React, {useState, useContext, useEffect} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import { Box, Container, Text, HStack, VStack, Flex } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
>>>>>>> 30a998d (main merge)

const Menu = () => {
  const { drinks } = useDrinkContext();

  //want to see how many drinks, currently: 28
  console.log(drinks.length);

<<<<<<< HEAD
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
            <GridItem key={index} bg='gray.100' borderRadius='lg' py={4} px={2}>
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

export default Menu;
=======
import React from 'react'

const menu = () => {
  return (
    <div>menu</div>
=======
  useEffect(() => {
    const catDrinks = uniqueCategories.reduce((acc, category) => {
      acc[category] = drinks.filter(item => item.category === category).slice(0, 5);
      return acc;
    }, {});
    setMenu(catDrinks);
  }, []);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunks = chunkArray(uniqueCategories, 3);
  
  return (
    <Box bg='gray.200'>
    <Navbar/>
    <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
    <Flex direction='row'  w='100%' h='100%' justify='center' align='center' pb={40}>
      {/* <Box width={60} h={80} bg='gray.100' borderRadius='2rem' display='flex' direction='row' justifyContent='center' alignItems='center' _hover={{bg:'tomato'}}>
      <Text>.mp4 is inserted here</Text>
      </Box> */}
        <div className='menuPane'>
        {chunks.map((chunk, index) => (
          <HStack key={index} spacing='24px' align='flex-start'>
            {chunk.map((category) => (
              <VStack key={category} spacing='24px'>
                <Box className="menuCategory" marginTop={'24px'} padding={'30px'} bg='gray.100' borderRadius='2rem'>
                  <Text fontSize='md' fontWeight={700}>{category}</Text>
                  <table>
                    {menu[category] && menu[category].map((item) => (
                      <tr key={item.drinkId}>
                        <td>{item.drinkName}</td>
                        <td>{item.sizeOptions.map(size => size.size).join(',')}</td>
                        {/* <td>{item.basePrice.toFixed(2)} CAD</td> */}
                      </tr>
                    ))}
                  </table>
                </Box>
              </VStack>
            ))}
          </HStack>
        ))}
        </div>
    </Flex>
    <Footer/>
    </Container>
    </Box>
>>>>>>> 30a998d (main merge)
  )
}

export default menu
>>>>>>> 4cfae57 (routing)
