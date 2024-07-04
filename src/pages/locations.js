import React, { useContext } from "react";
import { useDrinkContext } from "../../context/drinkContext";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
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
  useColorModeValue
} from "@chakra-ui/react";

const Locations = () => {
  const { locations } = useDrinkContext();
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  return (
    <Box bg="#bcc8c3">
      <Navbar />
      <Container w='100vw' minH='100vh' maxW='7xl' py={10} >
      <Flex direction="column" justify="center" align="center" w="100%" h='100%' mt={20}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} p={4}>
            {locations.map((location, index) => (
              <GridItem key={index}>
                <Card
                  borderRadius="lg"
                  width="280px"
                  overflow="hidden"
                  boxShadow="md"
                  bg={cardBgColor}
                  _hover={{ bg: cardHoverBgColor, transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
                >
                  {location.image && (
                    <Image
                      src={location.image}
                      alt={`${location.name} location`}
                      objectFit="cover"
                      height="150px"
                      width="100%"
                    />
                  )}
                  <CardBody p={4}>
                    <Stack spacing={3}>
                      <Heading size="md" textAlign="center" color="white">
                        {location.name}
                      </Heading>
                      <Text textAlign="center" color="white">
                        Operating Hours: {location.operatingHour}
                      </Text>
                      <Text color="white" fontSize="md" textAlign="center">
                        Phone: {location.phoneNumber}
                      </Text>
                    </Stack>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Container>
      <Footer/>
    </Box>
  );
};

export default Locations;
