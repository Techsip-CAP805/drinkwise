import React, { useState, useEffect } from 'react';
import {
  Box, Container, VStack, Select, Button, SimpleGrid, Card, CardBody, Image, Text, HStack, Input, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Spacer, CheckboxGroup, Checkbox
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import AdminSideNav from '@/components/AdminSideNav.js';
import DualListbox from "@/components/DualListBox";
import { withRole } from '../../../../../../lib/auth';

const OrderMenu = () => {
  const [locations, setLocations] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDrink, setCurrentDrink] = useState({ drinkName: '', description: '', basePrice: '', imagePath: '', ingredients: [], sizeOptions: [], iceLevelOptions: [] });
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
      } else {
        console.error('Failed to fetch drinks:', data.error);
      }
    };

    const fetchIngredients = async () => {
      const response = await fetch('/api/ingredients');
      const data = await response.json();
      if (response.ok) {
        setIngredients(data);
      } else {
        console.error('Failed to fetch ingredients:', data.error);
      }
    };

    fetchLocations();
    fetchDrinks();
    fetchIngredients();
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleAddDrink = () => {
    setCurrentDrink({ drinkName: '', description: '', basePrice: '', imagePath: '', ingredients: [], sizeOptions: [], iceLevelOptions: [] });
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

    let response;
    try {
      if (currentDrink._id) {
        response = await fetch(`/api/editMenu/${currentDrink._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedDrink),
        });
      } else {
        const maxDrinkID = drinks.reduce((maxID, drink) => Math.max(maxID, drink.drinkID), 0);
        const newDrink = {
          ...currentDrink,
          drinkID: maxDrinkID + 1,
        };
        response = await fetch('/api/editMenu', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDrink),
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

  const filteredDrinks = drinks.filter(drink =>
    drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDrink((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeOptionChange = (values) => {
    setCurrentDrink((prev) => ({
      ...prev,
      sizeOptions: values.map(size => ({ size }))
    }));
  };

  const handleIceOptionChange = (values) => {
    setCurrentDrink((prev) => ({
      ...prev,
      iceLevelOptions: values.map(ice => ({ iceLevel: parseInt(ice, 10) }))
    }));
  };

  return (
    <Box bg='#bcc8c3' minH='100vh' display='flex'>
      <AdminSideNav />
      <Container w='100%' minH='100vh' py={10} maxW='7xl' ml="250px">
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
          <ModalHeader>{currentDrink._id ? 'Edit Drink' : 'Add Drink'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Drink Name</FormLabel>
              <Input name='drinkName' value={currentDrink.drinkName} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input name='description' value={currentDrink.description} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input name='basePrice' type='number' value={currentDrink.basePrice} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image URL</FormLabel>
              <Input name='imagePath' value={currentDrink.imagePath} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Ingredients</FormLabel>
              <DualListbox
                ingredients={ingredients}
                selectedIngredients={currentDrink.ingredients}
                onAddIngredient={(ingredient) => setCurrentDrink((prev) => ({
                  ...prev,
                  ingredients: [...prev.ingredients, ingredient],
                }))}
                onRemoveIngredient={(ingredient) => setCurrentDrink((prev) => ({
                  ...prev,
                  ingredients: prev.ingredients.filter((i) => i.ingredientName !== ingredient.ingredientName),
                }))}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="#372F2F">Size Options</FormLabel>
              <CheckboxGroup
                defaultValue={currentDrink.sizeOptions.map(option => option.size)}
                onChange={handleSizeOptionChange}
                width="320px"
              >
                <HStack spacing={4}>
                  <Checkbox value="M" colorScheme="teal">M</Checkbox>
                  <Checkbox value="L" colorScheme="teal">L</Checkbox>
                </HStack>
              </CheckboxGroup>
            </FormControl>
            {/* <FormControl mt={4}>
              <FormLabel color="#372F2F">Ice Level Options</FormLabel>
              <CheckboxGroup
                defaultValue={currentDrink.iceLevelOptions.map(option => option.iceLevel.toString())}
                onChange={handleIceOptionChange}
                width="320px"
              >
                <HStack spacing={4}>
                  <Checkbox value="0" colorScheme="teal">0%</Checkbox>
                  <Checkbox value="25" colorScheme="teal">25%</Checkbox>
                  <Checkbox value="50" colorScheme="teal">50%</Checkbox>
                  <Checkbox value="75" colorScheme="teal">75%</Checkbox>
                  <Checkbox value="100" colorScheme="teal">100%</Checkbox>
                </HStack>
              </CheckboxGroup>
            </FormControl> */}
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


//auth
export const getServerSideProps = withRole(['admin'], '/admin');

export default OrderMenu;
