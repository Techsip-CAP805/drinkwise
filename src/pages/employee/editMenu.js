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

import EditMenuModal from "./editMenuModal";

// Function to group drinks by category
const groupByCategory = (drinks) => {
  return drinks.reduce((acc, drink) => {
    if (!acc[drink.category]) {
      acc[drink.category] = [];
    }
    acc[drink.category].push(drink);
    return acc;
  }, {});
};

const EditMenu = () => {
  const { drinks } = useDrinkContext();
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  // Group drinks by category
  const groupedDrinks = groupByCategory(drinks);

  const { isOpen: isMenuOpen, onOpen: onOpenMenu, onClose: onCloseMenu } = useDisclosure();
  const [modalDrink, setModalDrink] = useState([]);

  return (
    <Box bg="#bcc8c3">
      {/* <Navbar /> */}
      <SideNav />
      <Box ml="250px">
      <Container w='100vw' minH='100vh' maxW='7xl' py={10}>
        <Flex direction="column" justify="center" align="center" w="100%" h='100%' mt={20}>
          {Object.keys(groupedDrinks).map((category) => (
            <Box key={category} w="100%">
              <Heading size="lg" color="white" textAlign="left" mb={4}>
                {category}
              </Heading>
              <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} p={4}>
                {groupedDrinks[category].map((drink, index) => (
                  <GridItem key={index}>
                    <Card
                      borderRadius="lg"
                      // width="280px"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                      _hover={{ bg: cardHoverBgColor, transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
                      
                      height="300px"
                    >
                      {drink.imagePath && (
                        <Image
                          src={drink.imagePath}
                          alt={`${drink.drinkName} drink`}
                          objectFit="cover"
                          height="150px"
                          width="100%"
                          onClick={()=>{setModalDrink(drink); onOpenMenu();}}
                        />
                      )}
                      <CardBody p={4}>
                        <Stack spacing={3} height="100%">
                          <Box h="70px" onClick={()=>{setModalDrink(drink); onOpenMenu();}}>
                          <Heading size="md" textAlign="center" color="white" mb="10px">
                            {drink.drinkName}
                          </Heading>
                          <Text color="white" fontSize="sm" textAlign="left">
                            {drink.description}
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
              <Divider my={8} />
            </Box>
          ))}
        </Flex>
      </Container>
      </Box>
      <EditMenuModal isOpen={isMenuOpen} onClose={onCloseMenu} drink={modalDrink} />
      {/* <Footer /> */}
    </Box>
  );
};

export default EditMenu;