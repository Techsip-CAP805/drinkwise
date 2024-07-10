import React, { useContext, useRef, useState } from 'react';
import { Box, Container, SimpleGrid, Card, CardBody, Image, Text, VStack, Input, Select, HStack, Button, IconButton, Heading, Flex} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDrinkContext } from '../../../../../context/drinkContext';
import Link from 'next/link';

const Locations = () => {
  const { locations, setLocations } = useDrinkContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [editingLocation, setEditingLocation] = useState(null);

  const nameRef = useRef();
  const operatingHourRef = useRef();
  const phoneNumberRef = useRef();
  const imageRef = useRef();
  const postalCodeRef = useRef();
  const addressRef = useRef();

  const handleAddLocation = () => {
    setLocations([...locations, {
      id: locations.length + 1,
      name: nameRef.current.value,
      operatingHour: operatingHourRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      image: imageRef.current.value,
      postalCode: postalCodeRef.current.value,
      address: addressRef.current.value
    }]);

    //resetting fields
    nameRef.current.value = '';
    operatingHourRef.current.value = '';
    phoneNumberRef.current.value = '';
    imageRef.current.value = '';
    postalCodeRef.current.value = '';
    addressRef.current.value = '';
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
  };

  const handleUpdateLocation = () => {
    setLocations(locations.map(loc => loc.id === editingLocation.id ? editingLocation : loc));
    setEditingLocation(null);
  };

  const handleDeleteLocation = (id) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const filteredLocations = locations
    .filter(location => location.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Flex direction='row' spacing={0} alignItems='start'>
        <VStack align="start" spacing={4} width="220px" p={4} mt={4} ml={4} h='90vh' bg='#8fa39b' borderRadius='5px' boxShadow='lg' position='fixed'>
          <Heading size="md" mb={4}>Drinkwise</Heading>
          <Link href='/admin/userid/dashboard'>dashboard</Link>
          <Text>Sales</Text>
          <Link href='/admin/userid/sales' ml={4}>sales overview</Link>
          <Text>Menu</Text>
          <Link href='/admin/userid/edit/menu/main' ml={4}>edit main menu</Link>
          <Link href='/admin/userid/edit/menu/order' ml={4}>edit order menu</Link>
          <Text>Locations</Text>
          <Link href='/admin/userid/edit/locations'>edit locations</Link>
        </VStack>

        <Container w='calc(100vw - 240px)' minH='100vh' py={10} maxW='6xl' ml='240px'>
          <VStack spacing={4} alignItems='center' mb={6}>
            <Input
              placeholder='Search locations...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              bg='white'
              w='70%'
              boxShadow='md'
            />
            <HStack spacing={4} w='70%'>
              <Text>Sort by:</Text>
              <Select value={sortBy} onChange={e => setSortBy(e.target.value)} bg='white' boxShadow='md'>
                <option value='name'>Name</option>
                <option value='operatingHour'>Operating Hour</option>
              </Select>
            </HStack>
            <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
              <Text fontSize='lg' fontWeight='bold' mb={4}>Add New Location</Text>
              <Input placeholder='Name' ref={nameRef} bg='white' mb={2} boxShadow='sm'/>
              <Input placeholder='Operating Hour' ref={operatingHourRef} bg='white' mb={2} boxShadow='sm'/>
              <Input placeholder='Phone Number' ref={phoneNumberRef} bg='white' mb={2} boxShadow='sm'/>
              <Input placeholder='Image URL' ref={imageRef} bg='white' mb={2} boxShadow='sm'/>
              <Input placeholder='Postal Code' ref={postalCodeRef} bg='white' mb={2} boxShadow='sm'/>
              <Input placeholder='Address' ref={addressRef} bg='white' mb={2} boxShadow='sm'/>
              <Button onClick={handleAddLocation} leftIcon={<AddIcon />} colorScheme='teal' mt={4}>Add Location</Button>
            </Box>
            {editingLocation && (
              <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
                <Text fontSize='lg' fontWeight='bold' mb={4}>Edit Location</Text>
                <Input
                  placeholder='Name'
                  value={editingLocation.name}
                  onChange={e => setEditingLocation({ ...editingLocation, name: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Operating Hour'
                  value={editingLocation.operatingHour}
                  onChange={e => setEditingLocation({ ...editingLocation, operatingHour: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Phone Number'
                  value={editingLocation.phoneNumber}
                  onChange={e => setEditingLocation({ ...editingLocation, phoneNumber: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Image URL'
                  value={editingLocation.image}
                  onChange={e => setEditingLocation({ ...editingLocation, image: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Postal Code'
                  value={editingLocation.postalCode}
                  onChange={e => setEditingLocation({ ...editingLocation, postalCode: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Input
                  placeholder='Address'
                  value={editingLocation.address}
                  onChange={e => setEditingLocation({ ...editingLocation, address: e.target.value })}
                  bg='white'
                  mb={2}
                  boxShadow='sm'
                />
                <Button onClick={handleUpdateLocation} leftIcon={<EditIcon />} colorScheme='blue' mt={4}>Update Location</Button>
              </Box>
            )}
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
            {filteredLocations.map((location) => (
              <Card key={location.id} w={['17rem', '18rem']}>
                <CardBody>
                  <Image src={location.image} alt={location.name} mb={4} objectFit='fill' borderRadius='md'/>
                  <Text fontSize='lg' fontWeight='bold' mb={2}>{location.name}</Text>
                  <Text mb={2}>Operating Hours: {location.operatingHour}</Text>
                  <Text mb={2}>Phone: {location.phoneNumber}</Text>
                  <Text mb={2}>Address: {location.address}</Text>
                  <Text mb={2}>Postal Code: {location.postalCode}</Text>
                  <HStack spacing={4} mt={4}>
                    <Button onClick={() => handleEditLocation(location)} leftIcon={<EditIcon />} colorScheme='blue'>Edit</Button>
                    <Button onClick={() => handleDeleteLocation(location.id)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Flex>
    </Box>
  );
};

export default Locations;
