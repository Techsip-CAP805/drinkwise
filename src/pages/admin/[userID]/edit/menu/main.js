import React, { useState, useRef, useEffect } from 'react';
import { Box, VStack, Heading, Link, Input, Button, Image, HStack, SimpleGrid, Text, Container, Card, CardBody, Flex } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AdminSideNav from '@/components/AdminSideNav.js';
import { withRole } from '../../../../../../lib/auth';

const MainMenu = () => {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDrink, setEditingDrink] = useState(null);

  const drinkNameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const basePriceRef = useRef();
  const imagePathRef = useRef();

  useEffect(() => {
    const fetchDrinks = async () => {
      const response = await fetch('/api/editMenu');
      const data = await response.json();
      if (data.success) {
        setDrinks(data.data);
      }
    };

    fetchDrinks();
  }, []);

  const handleAddDrink = async () => {
    const newDrink = {
      drinkID: drinks.length + 1,
      drinkName: drinkNameRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      basePrice: basePriceRef.current.value ? parseFloat(basePriceRef.current.value) : 0.0,
      imagePath: imagePathRef.current.value,
      onMenu: true,
    };

    const response = await fetch('/api/editMenu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDrink),
    });

    const data = await response.json();
    if (data.success) {
      setDrinks([...drinks, data.data]);
      clearForm();
    }
  };

  const handleEditDrink = (drink) => {
    setEditingDrink(drink);
  };

  const handleUpdateDrink = async () => {
    const updatedDrink = {
      ...editingDrink,
      basePrice: editingDrink.basePrice || editingDrink.basePrice === 0 ? parseFloat(editingDrink.basePrice) : 0.0,
    };

    const response = await fetch(`/api/editMenu/${editingDrink._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDrink),
    });

    const data = await response.json();
    if (data.success) {
      setDrinks(drinks.map(drink => drink._id === editingDrink._id ? data.data : drink));
      setEditingDrink(null);
    }
  };

  const handleDeleteDrink = async (id) => {
    const response = await fetch(`/api/editMenu/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (data.success) {
      setDrinks(drinks.filter(drink => drink._id !== id));
    }
  };

  const clearForm = () => {
    drinkNameRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
    basePriceRef.current.value = '';
    imagePathRef.current.value = '';
  };

  const filteredDrinks = drinks.filter(drink =>
    drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box bg='#e2e8f0' minH='100vh' p={0}>
      <Flex direction='row' spacing={0} alignItems='start'>
        <AdminSideNav />
        <Container w='calc(100vw - 260px)' minH='100vh' py={10} maxW='7xl' ml="250px">
          <VStack>
          <VStack spacing={4} alignItems='center' mb={6}>
            <Input
              placeholder='Search drinks...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              bg='white'
              w='70%'
              boxShadow='md'
            />
            <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
              <Text fontSize='lg' fontWeight='bold' mb={4}>Add New Drink</Text>
              <Input placeholder='Drink Name' ref={drinkNameRef} bg='white' mb={2} boxShadow='sm' />
              <Input placeholder='Description' ref={descriptionRef} bg='white' mb={2} boxShadow='sm' />
              <Input placeholder='Category' ref={categoryRef} bg='white' mb={2} boxShadow='sm' />
              <Input placeholder='Base Price' ref={basePriceRef} bg='white' mb={2} boxShadow='sm' type='number' step='0.01' />
              <Input placeholder='Image Path' ref={imagePathRef} bg='white' mb={2} boxShadow='sm' />
              <Button onClick={handleAddDrink} leftIcon={<AddIcon />} colorScheme='teal' mt={4}>Add Drink</Button>
            </Box>
            {editingDrink && (
              <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
                <Text fontSize='lg' fontWeight='bold' mb={4}>Edit Drink</Text>
                <Input
                  placeholder='Drink Name'
                  value={editingDrink.drinkName}
                  onChange={e => setEditingDrink({ ...editingDrink, drinkName: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Description'
                  value={editingDrink.description}
                  onChange={e => setEditingDrink({ ...editingDrink, description: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Category'
                  value={editingDrink.category}
                  onChange={e => setEditingDrink({ ...editingDrink, category: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Base Price'
                  value={editingDrink.basePrice}
                  onChange={e => setEditingDrink({ ...editingDrink, basePrice: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                  type='number'
                  step='0.01'
                />
                <Input
                  placeholder='Image Path'
                  value={editingDrink.imagePath}
                  onChange={e => setEditingDrink({ ...editingDrink, imagePath: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Button onClick={handleUpdateDrink} leftIcon={<EditIcon />} colorScheme='blue' mt={4}>Update Drink</Button>
              </Box>
            )}
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={16} mt={10} w='85%'>
            {filteredDrinks.map((drink) => (
              <Card key={drink._id} boxShadow='md'>
                <CardBody>
                  <Image src={drink.imagePath} alt={drink.drinkName} boxSize='150px' objectFit='cover' mb={4} />
                  <Text fontSize='lg' fontWeight='bold' mb={2}>{drink.drinkName}</Text>
                  <Text>ID: {drink.drinkID}</Text>
                  <Text>{drink.description}</Text>
                  <Text>Category: {drink.category}</Text>
                  <Text>Base Price: ${drink.basePrice ? drink.basePrice.toFixed(2) : 0.0}</Text>
                  <HStack spacing={4} mt={4}>
                    <Button onClick={() => handleEditDrink(drink)} leftIcon={<EditIcon />} colorScheme='blue'>Edit</Button>
                    <Button onClick={() => handleDeleteDrink(drink._id)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
          </VStack>
        </Container>
      </Flex>
    </Box>
  );
};

//auth
export const getServerSideProps = withRole(['admin'], '/admin/login');

export default MainMenu;
