// pages/locations.js
import { useState } from 'react';
import { Box, Container, Flex, Grid, GridItem, Image, Text, Heading, Stack, useColorModeValue, Card, CardBody } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LocationsPage({ locations }) {
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");
  const cardHoverBgColor = useColorModeValue("#8f9f9a", "#1F2D2B");

  // console.log(locations);

  return (
    <Box bg="#bcc8c3">
      <Navbar />
      <Container w='100vw' minH='100vh' maxW='7xl' py={10} >
        <Flex direction="column" justify="center" align="center" w="100%" h='100%' mt={32}>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6} p={4}>
            {locations.map((location) => (
              <GridItem key={location._id}>
                <Card
                  borderRadius="lg"
                  width="280px"
                  overflow="hidden"
                  boxShadow="md"
                  bg={cardBgColor}
                  _hover={{ bg: cardHoverBgColor, transform: "scale(1.05)", transition: "all 0.3s ease-in-out" }}
                >
                  {location.imagePath && (
                    <Image
                      src={location.imagePath}
                      alt={`${location.branchName} location`}
                      objectFit="cover"
                      height="150px"
                      width="100%"
                    />
                  )}
                  <CardBody p={4}>
                    <Stack spacing={3}>
                      <Heading size="md" textAlign="center" color="white">
                        {location.branchName}
                      </Heading>
                      <Text textAlign="center" color="white">
                        Operating Hours: {location.schedule}
                      </Text>
                      <Text color="white" fontSize="md" textAlign="center">
                        Phone: {location.contactNumber}
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
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
  const locations = await res.json();
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/locations`)
  return {
    props: { locations },
  };
}
