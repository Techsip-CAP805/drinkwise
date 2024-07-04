import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Container, Flex} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDrinkContext } from '../../../context/drinkContext';

const LocationDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const { locations } = useDrinkContext();
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (id && locations.length) {
        console.log(id);
        console.log(locations);
        const numericId = parseInt(id, 10); // Convert id to a number
      const foundLocation = locations.find(location => location.id === numericId);
      console.log("FOUND LOCATION: ", foundLocation);
      setLocation(foundLocation);
    }
  }, [id, locations]);

  if (!location) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box bg='#bcc8c3'>
      <Navbar />
      <Container maxW='container.lg' py={10} pt={40} minH='100vh' centerContent>
        <Flex direction='column' justify='center' align='center'>
            <Text fontSize='3xl' fontWeight='bold'>{location.name}</Text>
            <Text>{location.address}</Text>
            <Text>{location.postalCode}</Text>
            <Text>{location.operatingHour}</Text>
            <Text>{location.phoneNumber}</Text>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default LocationDetails;
