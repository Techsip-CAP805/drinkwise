import React, { useEffect, useState } from "react";
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
import { withRole } from "../../../lib/auth";

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

// Function to check if an image exists
const imageExists = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

const EditMenu = ({ drinks, currentBranch }) => {
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  const groupedDrinks = groupByCategory(drinks);

  const { isOpen: isMenuOpen, onOpen: onOpenMenu, onClose: onCloseMenu } = useDisclosure();
  const [modalDrink, setModalDrink] = useState(null);

  const [unavailableDrinks, setUnavailableDrinks] = useState(
    currentBranch[0].unavailableDrinks.map(drink => drink.drinkID)
  );

  const [switchStatus, setSwitchStatus] = useState({});
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const initialStatus = {};
    drinks.forEach(drink => {
      initialStatus[drink.drinkID] = !unavailableDrinks.includes(drink.drinkID);
    });
    setSwitchStatus(initialStatus);

    // Pre-fetch images to check their existence
    const fetchImages = async () => {
      const urls = {};
      for (const drink of drinks) {
        const exists = await imageExists(drink.imagePath);
        urls[drink.drinkID] = exists ? drink.imagePath : "/boba.jpeg";
      }
      setImageUrls(urls);
    };

    fetchImages();
  }, [drinks, unavailableDrinks]);

  const handleToggle = async (drinkID) => {
    const newStatus = !switchStatus[drinkID];
    setSwitchStatus(prevStatus => ({
      ...prevStatus,
      [drinkID]: newStatus
    }));

    const method = newStatus ? 'REMOVE' : 'ADD';

    try {
      const response = await fetch('/api/updateLocationDrinks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drinkID,
          branchId: currentBranch[0]._id,
          method,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update drinks');
      }

      const updatedLocation = await response.json();

      setUnavailableDrinks(updatedLocation.unavailableDrinks.map(drink => drink.drinkID));
    } catch (error) {
      console.error('Error updating location drinks:', error);
    }
  };

  return (
    <Box bg="#bcc8c3">
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
                  {groupedDrinks[category].map((drink) => (
                    <GridItem key={drink.drinkID}>
                      <Card
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        bg={cardBgColor}
                        _hover={{ bg: cardHoverBgColor, transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
                        height="300px"
                      >
                        <Image
                          src={imageUrls[drink.drinkID] || "/boba.jpeg"}
                          alt={`${drink.drinkName} drink`}
                          objectFit="cover"
                          height="150px"
                          width="100%"
                          style={{
                            filter: switchStatus[drink.drinkID] ? "none" : "grayscale(100%)"
                          }}
                          onClick={() => { setModalDrink(drink); onOpenMenu(); }}
                        />
                        <CardBody p={4}>
                          <Stack spacing={3} height="100%">
                            <Box h="70px" onClick={() => { setModalDrink(drink); onOpenMenu(); }}>
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
                                isChecked={switchStatus[drink.drinkID]}
                                onChange={() => handleToggle(drink.drinkID)}
                                sx={{
                                  "& .chakra-switch__track": {
                                    bg: switchStatus[drink.drinkID] ? "teal.500" : "red.500",
                                  },
                                }}
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
    </Box>
  );
};

// export async function getServerSideProps() {
//   const resDrinks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drinkMenu`);
//   const drinks = await resDrinks.json();
//   const resLoc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentBranch`);
//   const currentBranch = await resLoc.json();
//   return {
//     props: { drinks, currentBranch },
//   };
// }

export const getServerSideProps = async (context) => {
  const roleCheck = await withRole(['employee'], '/employee/login')(context);

  if (roleCheck.redirect) {
    return roleCheck;
  }

  const resDrinks = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drinkMenu`);
  const drinks = await resDrinks.json();
  const resLoc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentBranch`);
  const currentBranch = await resLoc.json();

  return {
    props: {
      drinks,
      currentBranch,
    },
  };
};

export default EditMenu;
