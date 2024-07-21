import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, Select, Button, SimpleGrid, Card, CardBody, Image, Text, HStack, Input, Heading, Link,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel,
  Input as ChakraInput, useDisclosure
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import AdminSideNav from '@/components/AdminSideNav.js';

const OrderMenu = () => {
  const [locations, setLocations] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDrink, setCurrentDrink] = useState({ drinkName: '', description: '', basePrice: '', imagePath: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('/api/locations');
      const data = await response.json();
      if (response.ok) {
        setLocations(data);
      } else {
        console.error('Failed to fetch locations:', data.error);
      }
    };

    const fetchDrinks = async () => {
      const response = await fetch('/api/editMenu');
      const data = await response.json();
      if (response.ok) {
        setDrinks(data.data);
      }
    };

    fetchLocations();
    fetchDrinks();
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddDrink = () => {
    setCurrentDrink({ drinkName: '', description: '', basePrice: '', imagePath: '' });
    onOpen();
  };

  const handleEditDrink = (drink) => {
    setCurrentDrink(drink);
    onOpen();
  };
  
  const handleSaveDrink = async () => {
    const updatedDrink = {
      ...currentDrink,
      basePrice: parseFloat(currentDrink.basePrice),
    };
  
    // console.log('Saving drink:', updatedDrink);
  
    let response;
    try {
      if (currentDrink._id) {
        // Update existing drink
        response = await fetch(`/api/editMenu/${currentDrink._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDrink),
        });
      } else {
        const updatedDrink = {
          ...currentDrink,
          drinkID: drinks.length +1,
        };
        // Add new drink
        response = await fetch('/api/editMenu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDrink),
        });
      }
  
      const data = await response.json();
      if (response.ok) {
        setDrinks((prevDrinks) =>
          currentDrink._id
            ? prevDrinks.map((drink) => (drink._id === currentDrink._id ? data.data : drink))
            : [...prevDrinks, data.data]
        );
        onClose();
      } else {
        console.error('Failed to save drink:', data.error);
      }
    } catch (error) {
      console.error('Error saving drink:', error);
    }
  };
  
  

  const handleDeleteDrink = async (id) => {
    const response = await fetch(`/api/editMenu/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (response.ok) {
      setDrinks((prevDrinks) => prevDrinks.filter((drink) => drink._id !== id));
    }
  };

  // const filteredDrinks = drinks.slice(0, 10).filter(drink =>
    const filteredDrinks = drinks.filter(drink =>
    drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDrink((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box bg='#bcc8c3' minH='100vh' display='flex'>
      {/* <VStack align="start" spacing={4} width='12vw' p={4} bg='#8fa39b' borderRadius='5px' boxShadow='lg' ml={4} mt={4}>
        <Heading size="md">Drinkwise</Heading>
        <Link href='/admin/userid/dashboard'>dashboard</Link>
        <Text>Sales</Text>
        <Link href='/admin/userid/sales'>sales overview</Link>
        <Text>Menu</Text>
        <Link href='/admin/userid/edit/menu/main'>edit main menu</Link>
        <Link href='/admin/userid/edit/menu/order'>edit order menu</Link>
        <Text>Locations</Text>
        <Link href='/admin/userid/edit/locations'>edit locations</Link>
      </VStack> */}
      <AdminSideNav />
      <Container w='100%' minH='100vh' py={10} maxW='7xl' ml ="250px">
        <VStack spacing={4} align='stretch'>
          <HStack spacing={4} justify='space-between' w='100%'>
            <Select placeholder='Select location' onChange={handleLocationChange} maxW='300px'>
              {locations.map(location => (
                <option key={location._id} value={location.branchName}>{location.branchName}</option>
              ))}
            </Select>
            <Button rightIcon={<AddIcon />} colorScheme='teal' onClick={handleAddDrink}>Add to all</Button>
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
                  <Text>${Number(drink.basePrice).toFixed(2)}</Text>
                  <HStack mt={2} spacing={4}>
                    <Button leftIcon={<EditIcon />} colorScheme='teal' onClick={() => handleEditDrink(drink)}>Edit</Button>
                    <Button leftIcon={<EditIcon />} colorScheme='red' onClick={() => handleDeleteDrink(drink._id)}>Delete</Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentDrink.drinkID ? 'Edit Drink' : 'Add Drink'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Drink Name</FormLabel>
              <ChakraInput name='drinkName' value={currentDrink.drinkName} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <ChakraInput name='description' value={currentDrink.description} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <ChakraInput name='basePrice' type='number' value={currentDrink.basePrice} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <ChakraInput name='imagePath' value={currentDrink.imagePath} onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={handleSaveDrink}>
              Save
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderMenu;
