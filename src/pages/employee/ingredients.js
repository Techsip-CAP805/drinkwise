import React, { useContext, useState } from "react";
import { useDrinkContext } from "../../../context/drinkContext";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "../../components/SideNav";
import {
  Box,
  Image,
  Text,
  Heading,
  Grid,
  GridItem,
  Card,
  CardBody,
  Stack,
  Container,
  Flex,
  Switch,
  useColorModeValue,
  Divider,
  Spacer,
  useDisclosure
} from "@chakra-ui/react";

// Function to arrange ingredients alphabetically
const sortIngredients = (ingredients) => {
    // Assuming ingredients is an array of objects
    return ingredients.sort((a, b) => {
      if (a.ingredientName < b.ingredientName) {
        return -1;
      }
      if (a.ingredientName > b.ingredientName) {
        return 1;
      }
      return 0;
    });
  }

const EditMenu = () => {
  const { ingredients } = useDrinkContext();
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  // Sort ingredients alphabetically
  const sortedIngredients = sortIngredients(ingredients);

  return (
    <Box bg="#bcc8c3" >
      {/* <Navbar /> */}
      <SideNav />
      <Box ml="250px">
      <Container w='100vw' minH='100vh' maxW='7xl' py={10}>
        <Flex direction="column" justify="center" align="center" w="100%" h='100%' mt={20}>
          {/* {Object.keys(sortedIngredients).map(() => ( */}
            <Box w="100%">
              <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} p={4}>
                {sortedIngredients.map((ingredient, index) => (
                  <GridItem key={index}>
                    <Card
                      borderRadius="lg"
                      // width="280px"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                    //   _hover={{ bg: cardHoverBgColor, transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
                      height="280px"
                    >
                      {ingredient.imagePath && (
                        <Image
                          src={ingredient.imagePath}
                          alt={`${ingredient.ingredientName}`}
                          objectFit="cover"
                          height="150px"
                          width="100%"
                        />
                      )}
                      <CardBody p={4}>
                        <Stack spacing={3} height="100%">
                          <Box h="50px">
                          <Heading size="md" textAlign="center" color="white" mb="10px">
                            {ingredient.ingredientName}
                          </Heading>
                          <Text color="white" fontSize="sm" textAlign="left">
                            {ingredient.description}
                          </Text>
                          </Box>
                          <Spacer />
                          <Flex justifyContent="flex-end">
                            <Switch
                              // isChecked={isToggled}
                              // onChange={handleToggle}
                              colorScheme="teal"
                            />
                          </Flex>
                        </Stack>
                      </CardBody>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
              {/* <Divider my={8} /> */}
            </Box>
          
          {/* } */}
        </Flex>
      </Container>
      </Box>
      {/* <EditMenuModal isOpen={isMenuOpen} onClose={onCloseMenu} drink={modalDrink} /> */}
      {/* <Footer /> */}
    </Box>
  );
};

export default EditMenu;