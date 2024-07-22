import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Container, Flex, Input, SimpleGrid, Card, CardBody, Image, VStack, Divider, Heading } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDrinkContext } from '../../../../context/drinkContext';
import { Link } from '@chakra-ui/next-js';
import OrderSideNav from '@/components/OrderSideNav';

const LocationDetails = () => {
  const router = useRouter();
  const { storeID } = router.query;
  const { locations, drinks, toppings} = useDrinkContext();
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (storeID && locations.length) {
      const numericId = parseInt(storeID, 10);
      const foundLocation = locations.find(location => location.id === numericId);
      setLocation(foundLocation);
    }
  }, [storeID, locations]);

  if (!location) {
    return <Text>Loading...</Text>;
  }

  const filteredDrinks = drinks.filter(drink =>
    drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(filteredDrinks.map(drink => drink.category)));

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Flex>
        <OrderSideNav />
        <Container maxW='container.xl' py={10}>
          <Flex direction='column' align='center' mb={6}>
            <Text fontSize='3xl' fontWeight='bold'>{location.name}</Text>
            <Text>{location.postalCode}</Text>
          </Flex>
          <Input
            placeholder='Search drinks...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            bg='white'
            mb={8}
          />
          <Divider mb={8} />
          {categories.map((category, index) => (
            <Box key={index} mb={10}>
              <Heading size="lg" mb={4}>{category}</Heading>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {filteredDrinks.filter(drink => drink.category === category).map((drink) => (
                  <Link href={`/order/store/${storeID}/drink/${drink.drinkID}`} key={drink.drinkID}>
                    <Card bg='white' h='250px'>
                      <CardBody display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                        <Image src={drink.imagePath} alt={drink.drinkName} boxSize='100px' mb={4} borderRadius='full' />
                        <Text fontSize='lg' >{drink.drinkName}</Text>
                        <Text fontSize='md'>${drink.basePrice.toFixed(2)}</Text>
                      </CardBody>
                    </Card>
                  </Link>
                ))}
              </SimpleGrid>
            </Box>
          ))}
        </Container>
      </Flex>
      <Footer />
    </Box>
  );
};

export default LocationDetails;
