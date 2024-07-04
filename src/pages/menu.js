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
            <GridItem key={index} bg='gray.100' borderRadius='lg' py={4} px={2} _hover={{bg:'white'}}>
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

export default Menu
