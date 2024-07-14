import React, { useState } from 'react';
import { Box, Container, VStack, Select, Button, SimpleGrid, Card, CardBody, Image, Text, HStack, Input, Heading, Link } from '@chakra-ui/react';
import { useDrinkContext } from '../../../../../../context/drinkContext';
import { AddIcon } from '@chakra-ui/icons';

const OrderMenu = () => {
  const { locations, drinks } = useDrinkContext();
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const filteredDrinks = drinks.slice(0, 10).filter(drink => 
    drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box bg='#bcc8c3' minH='100vh' display='flex'>
      <VStack align="start" spacing={4} width='12vw' p={4} bg='#8fa39b' borderRadius='5px' boxShadow='lg' ml={4} mt={4}>
        <Heading size="md">Drinkwise</Heading>
        <Link href='/admin/userid/dashboard'>dashboard</Link>
        <Text>Sales</Text>
        <Link href='/admin/userid/sales'>sales overview</Link>
        <Text>Menu</Text>
        <Link href='/admin/userid/edit/menu/main'>edit main menu</Link>
        <Link href='/admin/userid/edit/menu/order'>edit order menu</Link>
        <Text>Locations</Text>
        <Link href='/admin/userid/edit/locations'>edit locations</Link>
      </VStack>
      <Container w='100%' minH='100vh' py={10} maxW='7xl'>
        <VStack spacing={4} align='stretch'>
          <HStack spacing={4} justify='space-between' w='100%'>
            <Select placeholder='Select location' onChange={handleLocationChange} maxW='300px'>
              {locations.map(location => (
                <option key={location.id} value={location.name}>{location.name}</option>
              ))}
            </Select>
            <Button rightIcon={<AddIcon />} colorScheme='teal'>Add to all</Button>
          </HStack>
          <Input
            placeholder='Search drink...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            maxW='300px'
            mt={4}
          />
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
            {filteredDrinks.map((drink) => (
              <Card key={drink.drinkID}>
                <CardBody>
                  <Image src={drink.imagePath} alt={drink.drinkName} boxSize='100px' borderRadius='full' bg='tomato' />
                  <Text fontSize='lg' fontWeight='bold'>{drink.drinkName}</Text>
                  <Text>{drink.description}</Text>
                  <Text>${drink.basePrice.toFixed(2)}</Text>
                  <Button leftIcon={<AddIcon />} mt={2} colorScheme='teal'>Add Drink</Button>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default OrderMenu;
