import React, { useState, useEffect } from "react";
import { Box, Container, Text, Heading, VStack, Grid, GridItem, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Menu = () => {
  const [drinks, setDrinks] = useState([]);
  const [ingredientsMap, setIngredientsMap] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const drinksRes = await fetch('/api/drinkMenu');
        const drinksData = await drinksRes.json();
        // console.log('Drinks data:', drinksData);

        const drinksWithIngredients = drinksData.map(drink => {
          return {
            ...drink,
            ingredients: drink.ingredients.map(ing => ing.ingredientName || "N/A")
          };
        });

        // console.log('Drinks with ingredients:', drinksWithIngredients);
        setDrinks(drinksWithIngredients);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    fetchData();
  }, []);

  // Extract unique categories from drinks
  const categories = Array.from(new Set(drinks.map(drink => drink.category)));

  return (
    <Box bg="#bcc8c3">
      <Navbar />
      <Container maxW="container.xl" py={10} pt={32}>
        <Heading mb={7} fontSize="2xl" color="gray.700" textDecoration="underline">
          Our Menu
        </Heading>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {categories.map((category, index) => (
            <GridItem key={index} bg='gray.100' borderRadius='lg' py={4} px={2} _hover={{ bg: 'white' }}>
              <Box mx={4}>
                <Text fontSize="xl" fontWeight="bold" color="gray.700" textAlign="center">{category}</Text>
                <Box mt={4}>
                  {drinks.filter(drink => drink.category === category).map((drink, index) => (
                    <VStack key={index} align="start" mb={4}>
                      <Flex direction="row" align="center" justify="space-between" w="full" spacing={4}>
                        <Box width="320px">
                          <Text fontSize="md" color="gray.700">{drink.drinkName}</Text>
                          <Text fontSize="sm" color="gray.500">{drink.description}</Text>
                          {/* <Text fontSize="sm" color="gray.500">Ingredients: {drink.ingredients.join(", ")}</Text> */}
                        </Box>
                        <Box width="50px" paddingLeft="10px">
                          {drink.sizeOptions && (
                            <Text fontSize="sm" color="gray.500">
                              {drink.sizeOptions.map(size => size.size).join(", ")}
                            </Text>
                          )}
                        </Box>
                      </Flex>
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
