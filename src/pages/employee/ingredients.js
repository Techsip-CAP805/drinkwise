import React, { useEffect, useState } from "react";
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
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Icon
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

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

const EditMenu = ({ ingredients, currentBranch }) => {
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  // Sort ingredients alphabetically
  const sortedIngredients = sortIngredients(ingredients);

  const unavailableIngredients = currentBranch[0].unavailableIngredients.map(ingredient => ingredient.ingredientName);
  console.log(unavailableIngredients);
  
  // Create a state to keep track of switch statuses
  const [switchStatus, setSwitchStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(sortedIngredients);

  useEffect(() => {
    const initialStatus = {};
    sortedIngredients.forEach(ingredient => {
      const isUnavailable = unavailableIngredients.includes(ingredient.ingredientName);
      initialStatus[ingredient.ingredientName] = !isUnavailable;
    });
    setSwitchStatus(initialStatus);
  }, [sortedIngredients, unavailableIngredients]);

  useEffect(() => {
    setFilteredIngredients(
      sortedIngredients.filter(ingredient =>
        ingredient.ingredientName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, sortedIngredients]);

  const handleToggle = (ingredientName) => {
    setSwitchStatus(prevStatus => ({
      ...prevStatus,
      [ingredientName]: !prevStatus[ingredientName]
    }));
  };

  return (
    <Box bg="#bcc8c3">
      <SideNav />
      <Box ml="250px">
        <Container w='100vw' minH='100vh' maxW='7xl' py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h='100%' mt={20}>
            <InputGroup mb={6} w="50%">
              <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
              <Input
                type="text"
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Box w="100%">
              <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6} p={4}>
                {filteredIngredients.map((ingredient, index) => (
                  <GridItem key={index}>
                    <Card
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                      height="280px"
                    >
                      {ingredient.imagePath && (
                        <Image
                          src={ingredient.imagePath}
                          alt={`${ingredient.ingredientName}`}
                          objectFit="cover"
                          height="150px"
                          width="100%"
                          filter={unavailableIngredients.includes(ingredient.ingredientName) ? 'grayscale(100%)' : 'none'}
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
                              isChecked={switchStatus[ingredient.ingredientName]}
                              onChange={() => handleToggle(ingredient.ingredientName)}
                              sx={{
                                "& .chakra-switch__track": {
                                  bg: switchStatus[ingredient.ingredientName] ? "teal.500" : "red.500",
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
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  const resIng = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`);
  const ingredients = await resIng.json();
  const resLoc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentBranch`);
  const currentBranch = await resLoc.json();
  return {
    props: { ingredients, currentBranch },
  };
}

export default EditMenu;
