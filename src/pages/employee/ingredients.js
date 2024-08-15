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
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Icon
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { getSession, signIn } from "next-auth/react";
import { withRole } from "../../../lib/auth";

// Function to sort ingredients by name
const sortIngredients = (ingredients) => {
  return ingredients.sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));
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

const EditMenu = () => {
  const cardBgColor = useColorModeValue("#f7f7f7", "#1a1a1a");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  const [ingredients, setIngredients] = useState([]);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [unavailableIngredients, setUnavailableIngredients] = useState([]);
  const [switchStatus, setSwitchStatus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [imageUrls, setImageUrls] = useState({});
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (!session) {
        signIn(); // Redirect to login if not authenticated
        return;
      }

      const email = session.user.email;
      const encodedEmail = encodeURIComponent(email);

      const resIng = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ingredients`);
      const ingredientsData = await resIng.json();
      setIngredients(ingredientsData);

      const resLoc = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/currentBranch?email=${encodedEmail}`);
      const branchData = await resLoc.json();
      setCurrentBranch(branchData[0]);
      setUnavailableIngredients(branchData[0].unavailableIngredients.map(ingredient => ingredient.ingredientName));

      const initialStatus = {};
      ingredientsData.forEach(ingredient => {
        initialStatus[ingredient.ingredientName] = !branchData[0].unavailableIngredients.map(ingredient => ingredient.ingredientName).includes(ingredient.ingredientName);
      });
      setSwitchStatus(initialStatus);

      // Pre-fetch images to check their existence
      const fetchImages = async () => {
        const urls = {};
        for (const ingredient of ingredientsData) {
          const exists = await imageExists(ingredient.imagePath);
          urls[ingredient.ingredientName] = exists ? ingredient.imagePath : "/boba.jpeg";
        }
        setImageUrls(urls);
      };

      fetchImages();
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredIngredients(
      ingredients.filter(ingredient => {
        const matchesSearch = ingredient.ingredientName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filter === "All" ||
          (filter === "In Stock" && !unavailableIngredients.includes(ingredient.ingredientName)) ||
          (filter === "Unavailable" && unavailableIngredients.includes(ingredient.ingredientName));
        return matchesSearch && matchesFilter;
      })
    );
  }, [searchQuery, ingredients, filter, unavailableIngredients]);

  const handleToggle = async (ingredientName) => {
    const newStatus = !switchStatus[ingredientName];
    setSwitchStatus(prevStatus => ({
      ...prevStatus,
      [ingredientName]: newStatus
    }));

    const method = newStatus ? 'REMOVE' : 'ADD';

    try {
      await fetch('/api/updateLocationIngredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredientName,
          branchId: currentBranch._id,
          method,
          currentBranch
        }),
      });

      // Update the unavailableIngredients array
      setUnavailableIngredients(prevState =>
        method === 'ADD'
          ? [...prevState, ingredientName]
          : prevState.filter(item => item !== ingredientName)
      );
    } catch (error) {
      console.error('Error updating location ingredients:', error);
    }
  };

  if (!currentBranch) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="#f0f0f0">
      <SideNav />
      <Box ml="250px">
        <Container w='100vw' minH='100vh' maxW='7xl' py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h='100%' mt={20}>
            <InputGroup mb={6} w="50%" borderColor="gray.700">
              <InputLeftElement pointerEvents="none" >
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
            <Select mb={6} w="50%" value={filter} onChange={(e) => setFilter(e.target.value)} borderColor="gray.700">
              <option value="All">All</option>
              <option value="In Stock">In Stock</option>
              <option value="Unavailable">Unavailable</option>
            </Select>
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
                          src={imageUrls[ingredient.ingredientName] || "/boba.jpeg"}
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
                            <Heading size="md" textAlign="center" color="gray.700" mb="10px">
                              {ingredient.ingredientName}
                            </Heading>
                            <Text color="gray.700" fontSize="sm" textAlign="left">
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


//auth
export const getServerSideProps = withRole(['employee'], '/employee/login');

export default EditMenu;
