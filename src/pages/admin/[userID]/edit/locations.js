import React, { useRef, useState } from 'react';
import { Box, Container, SimpleGrid, Card, CardBody, Image, Text, VStack, Input, Select, HStack, Button, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDrinkContext } from '../../../../../context/drinkContext';
import Link from 'next/link';

const EditLocations = () => {
  const { locations, setLocations } = useDrinkContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [editingLocation, setEditingLocation] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

    // Resetting fields
    nameRef.current.value = '';
    operatingHourRef.current.value = '';
    phoneNumberRef.current.value = '';
    imageRef.current.value = '';
    postalCodeRef.current.value = '';
    addressRef.current.value = '';
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    onOpen();
  };

  const handleUpdateLocation = () => {
    setLocations(locations.map(loc => loc.id === editingLocation.id ? editingLocation : loc));
    setEditingLocation(null);
    onClose();
  };

  const handleDeleteLocation = (id) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const filteredLocations = locations
    .filter(location => location.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingLocation(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <VStack align="start" spacing={4} width='12vw' p={4} mt={4} ml={4} h='90vh' bg='#8fa39b' borderRadius='5px' boxShadow='lg' position='fixed'>
        <Heading size="md">Drinkwise</Heading>
        <Link href='/admin/userid/dashboard'>dashboard</Link>
        <Text>Sales</Text>
        <Link href='/admin/userid/sales' ml={4}>sales overview</Link>
        <Text>Menu</Text>
        <Link href='/admin/userid/edit/menu/main' ml={4}>edit main menu</Link>
        <Link href='/admin/userid/edit/menu/order' ml={4}>edit order menu</Link>
        <Text>Locations</Text>
        <Link href='/admin/userid/edit/locations'>edit locations</Link>
      </VStack>
      <Container w='calc(100vw - 240px)' minH='100vh' py={10} maxW='6xl' centerContent>
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
            <Text w='15%'>Sort by:</Text>
            <Select value={sortBy} onChange={e => setSortBy(e.target.value)} bg='white' boxShadow='md'>
              <option value='name'>Name</option>
              <option value='operatingHour'>Operating Hour</option>
            </Select>
          </HStack>
          <Box w='70%' bg='white' p={6} borderRadius='md' boxShadow='lg'>
            <Text fontSize='lg' fontWeight='bold' mb={4}>Add New Location</Text>
            <Input placeholder='Name' ref={nameRef} bg='white' mb={2} boxShadow='sm' />
            <Input placeholder='Operating Hour' ref={operatingHourRef} bg='white' mb={2} boxShadow='sm' />
            <Input placeholder='Phone Number' ref={phoneNumberRef} bg='white' mb={2} boxShadow='sm' />
            <Input placeholder='Image URL' ref={imageRef} bg='white' mb={2} boxShadow='sm' />
            <Input placeholder='Postal Code' ref={postalCodeRef} bg='white' mb={2} boxShadow='sm' />
            <Input placeholder='Address' ref={addressRef} bg='white' mb={2} boxShadow='sm' />
            <Button onClick={handleAddLocation} leftIcon={<AddIcon />} colorScheme='teal' mt={4}>Add Location</Button>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mt={10}>
            {filteredLocations.map((location) => (
              <Card key={location.id} w={['17rem', '18rem']}>
                <CardBody>
                  <Image src={location.image} alt={location.name} mb={4} objectFit='fill' borderRadius='md' />
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
        </VStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Location</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder='Name'
                name='name'
                value={editingLocation?.name || ''}
                onChange={handleChange}
                bg='white'
                mb={2}
                boxShadow='sm'
              />
              <Input
                placeholder='Operating Hour'
                name='operatingHour'
                value={editingLocation?.operatingHour || ''}
                onChange={handleChange}
                bg='white'
                mb={2}
                boxShadow='sm'
              />
              <Input
                placeholder='Phone Number'
                name='phoneNumber'
                value={editingLocation?.phoneNumber || ''}
                onChange={handleChange}
                bg='white'
                mb={2}
                boxShadow='sm'
              />
              <Input
                placeholder='Image URL'
                name='image'
                value={editingLocation?.image || ''}
                onChange={handleChange}
                bg='white'
                mb={2}
                boxShadow='sm'
              />
              <Input
                placeholder='Postal Code'
                name='postalCode'
                value={editingLocation?.postalCode || ''}
                onChange={handleChange}
                bg='white'
                mb={2}
                boxShadow='sm'
              />
              <Input
                placeholder='Address'
                name='address'
                value={editingLocation?.address || ''}
                onChange={handleChange}
                bg='white'
                mb={2}
                boxShadow='sm'
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' leftIcon={<EditIcon />} onClick={handleUpdateLocation}>Update Location</Button>
              <Button variant='ghost' ml={3} onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default EditLocations;
