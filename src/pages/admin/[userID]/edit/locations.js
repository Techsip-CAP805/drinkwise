import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Container, SimpleGrid, Card, CardBody, Image, Text, VStack,
  Input, Select, HStack, Button, Heading, useDisclosure, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import AdminSideNav from '@/components/AdminSideNav.js';
import { withRole } from '../../../../../lib/auth';

const EditLocations = () => {
  const [locations, setLocations] = useState([]);
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

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/editLocations');
      const data = await response.json();
      setLocations(data.data);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    }
  };

  const handleAddLocation = async () => {
    const newLocation = {
      branchName: nameRef.current.value,
      operatingHour: operatingHourRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      imagePath: imageRef.current.value,
      postalCode: postalCodeRef.current.value,
      address: addressRef.current.value
    };

    try {
      const response = await fetch('/api/editLocations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newLocation)
      });

      const data = await response.json();

      if (response.ok) {
        // Refresh locations after adding
        fetchLocations();
        // Resetting fields
        nameRef.current.value = '';
        operatingHourRef.current.value = '';
        phoneNumberRef.current.value = '';
        imageRef.current.value = '';
        postalCodeRef.current.value = '';
        addressRef.current.value = '';
      } else {
        console.error('Failed to add location:', data.error);
      }
    } catch (error) {
      console.error('Failed to add location:', error);
    }
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    onOpen();
  };

  const handleUpdateLocation = async () => {
    try {
      const response = await fetch(`/api/editLocations/${editingLocation._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingLocation)
      });

      const data = await response.json();

      if (response.ok) {
        setLocations(locations.map(loc => loc._id === editingLocation._id ? data.data : loc));
        setEditingLocation(null);
        onClose();
      } else {
        console.error('Failed to update location:', data.error);
      }
    } catch (error) {
      console.error('Failed to update location:', error);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await fetch(`/api/editLocations/${id}`, {
        method: 'DELETE'
      });
      setLocations(locations.filter(loc => loc._id !== id));
    } catch (error) {
      console.error('Failed to delete location:', error);
    }
  };

  const filteredLocations = locations
    .filter(location => location && location.branchName && location.branchName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (a.branchName > b.branchName ? 1 : -1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, nestedField] = name.split('.');

    setEditingLocation(prev => {
      if (nestedField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [nestedField]: value
          }
        };
      } else {
        return {
          ...prev,
          [field]: value
        };
      }
    });
  };

  return (
    <Box bg='#e2e8f0' minH='100vh'>
      {/* <VStack align="start" spacing={4} width='12vw' p={4} mt={4} ml={4} h='90vh' bg='#8fa39b' borderRadius='5px' boxShadow='lg' position='fixed'>
        <Heading size="md">Drinkwise</Heading>
        <Link href='/admin/userid/dashboard'>dashboard</Link>
        <Text>Sales</Text>
        <Link href='/admin/userid/sales' ml={4}>sales overview</Link>
        <Text>Menu</Text>
        <Link href='/admin/userid/edit/menu/main' ml={4}>edit main menu</Link>
        <Link href='/admin/userid/edit/menu/order' ml={4}>edit order menu</Link>
        <Text>Locations</Text>
        <Link href='/admin/userid/edit/locations'>edit locations</Link>
      </VStack> */}
      <AdminSideNav />
      <Container w='calc(100vw - 240px)' minH='100vh' py={10} maxW='7xl' ml="250px" centerContent>
        <VStack w='100%' >
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
              <option value='branchName'>Name</option>
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
              <Card key={location._id} w={['17rem', '18rem']}>
                <CardBody>
                  <Image
                    src={location.imagePath}
                    alt={location.branchName}
                    mb={4}
                    objectFit='fill'
                    borderRadius='md'
                  />
                  <Text fontSize='lg' fontWeight='bold' mb={2}>{location.branchName}</Text>
                  <Text mb={2}>Operating Hours: {location.schedule}</Text>
                  <Text mb={2}>Phone: {location.contactNumber}</Text>
                  <Text mb={2}>
                    Address:
                    {location.branchLocation ?
                      `${location.branchLocation.addressLine1}, ${location.branchLocation.city}` : 'N/A'}
                  </Text>
                  <Text mb={2}>Postal Code: {location.branchLocation ? location.branchLocation.postalCode : 'N/A'}</Text>
                  <HStack spacing={4} mt={4}>
                    <Button onClick={() => handleEditLocation(location)} leftIcon={<EditIcon />} colorScheme='blue'>Edit</Button>
                    <Button onClick={() => handleDeleteLocation(location._id)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete</Button>
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
                name='branchName'
                value={editingLocation?.branchName || ''}
                onChange={handleChange}
                mb={2}
              />
              <Input
                placeholder='Operating Hour'
                name='schedule'
                value={editingLocation?.schedule || ''}
                onChange={handleChange}
                mb={2}
              />
              <Input
                placeholder='Phone Number'
                name='contactNumber'
                value={editingLocation?.contactNumber || ''}
                onChange={handleChange}
                mb={2}
              />
              <Input
                placeholder='Image URL'
                name='imagePath'
                value={editingLocation?.imagePath || ''}
                onChange={handleChange}
                mb={2}
              />
              <Input
                placeholder='Postal Code'
                name='branchLocation.postalCode'
                value={editingLocation?.branchLocation?.postalCode || ''}
                onChange={handleChange}
                mb={2}
              />
              <Input
                placeholder='Address'
                name='branchLocation.addressLine1'
                value={editingLocation?.branchLocation?.addressLine1 || ''}
                onChange={handleChange}
                mb={2}
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleUpdateLocation} colorScheme='blue'>Save</Button>
              <Button onClick={onClose} ml={3}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </VStack>
      </Container>
    </Box>
  );
};


//auth
export const getServerSideProps = withRole(['admin'], '/admin');

export default EditLocations;
