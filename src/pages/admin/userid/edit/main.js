import React, { useContext, useState, useRef } from 'react';
import { Box, VStack, Heading, Link, Input, Button, Image, HStack, SimpleGrid, Text, IconButton, Container, Card, CardBody } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDrinkContext } from '../../../../../context/drinkContext';

const MainMenu = () => {
  const { drinks, setDrinks } = useDrinkContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDrink, setEditingDrink] = useState(null);

  const drinkNameRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const basePriceRef = useRef();
  const imagePathRef = useRef();

  const handleAddDrink = () => {
    const newDrink = {
      drinkID: drinks.length + 1,
      drinkName: drinkNameRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      basePrice: parseFloat(basePriceRef.current.value),
      imagePath: imagePathRef.current.value,
      onMenu: true,
    };
    setDrinks([...drinks, newDrink]);
    clearForm();
  };

  const handleEditDrink = (drink) => {
    setEditingDrink(drink);
  };

  const handleUpdateDrink = () => {
    setDrinks(drinks.map(drink => drink.drinkID === editingDrink.drinkID ? editingDrink : drink));
    setEditingDrink(null);
  };

  const handleDeleteDrink = (id) => {
    setDrinks(drinks.filter(drink => drink.drinkID !== id));
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
    <Box bg='#bcc8c3' minH='100vh' p={4}>
      <HStack spacing={0} alignItems='start'>
        <VStack align="start" spacing={4} width="200px" h='90vh' p={4} bg='#8fa39b' borderRadius='5px' boxShadow='lg' position='fixed'>
          <Heading size="md">Drinkwise</Heading>
          <Link href='/admin/userid/dashboard'>dashboard</Link>
          <Text>Sales</Text>
          <Link href='/admin/userid/sales' ml={4}>sales overview</Link>
          <Text>Menu</Text>
          <Link href='/admin/userid/edit/main' ml={4}>edit main menu</Link>
          <Link href='/admin/userid/edit/order' ml={4}>edit order menu</Link>
          <Text>Locations</Text>
          <Link href='/admin/userid/locations'>edit locations</Link>
        </VStack>

        <Container w='100vw' minH='100vh' py={10} maxW='6xl'>
          <VStack spacing={4} alignItems='center' mb={6}>
            <Input
              placeholder='Search drinks...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              bg='white'
              w='70%'
            />
            <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
              <Text fontSize='lg' fontWeight='bold'>Add New Drink</Text>
              <Input placeholder='Drink Name' ref={drinkNameRef} bg='white' mb={2}/>
              <Input placeholder='Description' ref={descriptionRef} bg='white' mb={2}/>
              <Input placeholder='Category' ref={categoryRef} bg='white' mb={2}/>
              <Input placeholder='Base Price' ref={basePriceRef} bg='white' mb={2}/>
              <Input placeholder='Image Path' ref={imagePathRef} bg='white' mb={2}/>
              <Button onClick={handleAddDrink} leftIcon={<AddIcon />} colorScheme='teal'>Add Drink</Button>
            </Box>
            {editingDrink && (
              <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
                <Text fontSize='lg' fontWeight='bold'>Edit Drink</Text>
                <Input
                  placeholder='Drink Name'
                  value={editingDrink.drinkName}
                  onChange={e => setEditingDrink({ ...editingDrink, drinkName: e.target.value })}
                  bg='white'
                  mb={2}
                />
                <Input
                  placeholder='Description'
                  value={editingDrink.description}
                  onChange={e => setEditingDrink({ ...editingDrink, description: e.target.value })}
                  bg='white'
                  mb={2}
                />
                <Input
                  placeholder='Category'
                  value={editingDrink.category}
                  onChange={e => setEditingDrink({ ...editingDrink, category: e.target.value })}
                  bg='white'
                  mb={2}
                />
                <Input
                  placeholder='Base Price'
                  value={editingDrink.basePrice}
                  onChange={e => setEditingDrink({ ...editingDrink, basePrice: parseFloat(e.target.value) })}
                  bg='white'
                  mb={2}
                />
                <Input
                  placeholder='Image Path'
                  value={editingDrink.imagePath}
                  onChange={e => setEditingDrink({ ...editingDrink, imagePath: e.target.value })}
                  bg='white'
                  mb={2}
                />
                <Button onClick={handleUpdateDrink} leftIcon={<EditIcon />} colorScheme='blue'>Update Drink</Button>
              </Box>
            )}
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
            {filteredDrinks.map((drink) => (
              <Card key={drink.drinkID}>
                <CardBody>
                  <Image src={drink.imagePath} alt={drink.drinkName} boxSize='200px' mb={4}/>
                  <Text fontSize='lg' fontWeight='bold'>{drink.drinkName}</Text>
                  <Text>ID: {drink.drinkID}</Text>
                  <Text>{drink.description}</Text>
                  <Text>Category: {drink.category}</Text>
                  <Text>Base Price: ${drink.basePrice.toFixed(2)}</Text>
                  <HStack spacing={4} mt={4}>
                    <Button onClick={() => handleEditDrink(drink)} leftIcon={<EditIcon />}>Edit</Button>
                    <Button onClick={() => handleDeleteDrink(drink.drinkID)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </HStack>
    </Box>
  );
};

export default MainMenu;
