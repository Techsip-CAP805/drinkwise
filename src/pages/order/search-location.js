import React, { useState, useContext } from 'react';
import {
  Box,
  Text,
  Container,
  Input,
  Select,
  Flex,
  VStack,
  HStack,
  IconButton,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  Stack
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Navbar from '@/components/Navbar';
import { DrinkContext } from '../../../context/drinkContext';

const SearchLocation = () => {
  const { locations } = useContext(DrinkContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filteredLocations = locations
    .filter(location => location.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  return (
    <Box bg='#bcc8c3'>
      <Navbar />
      <Container w='auto' minH='100vh' maxW='7xl' py={10} pt={40}>
        <VStack spacing={8} align='stretch'>
          <Box textAlign='center'>
            <Text fontSize='2xl' fontWeight='bold'>Search Location</Text>
            <Input
              variant='unstyled'
              placeholder='type address here...'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              size='lg'
              mt={2}
              border='none'
              borderBottom='2px solid'
              borderRadius='0'
            />
          </Box>

          <HStack spacing={4} align='center'>
            <Text fontSize='lg' fontWeight='bold'>sort by:</Text>
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              maxW='150px'
              variant='unstyled'
              borderBottom='2px solid'
            >
              <option value='name'>Name</option>
              <option value='distance'>Distance</option>
            </Select>
          </HStack>

          <VStack spacing={5} align='stretch'>
            {filteredLocations.map((location, index) => (
              <Card key={index} borderRadius="md" boxShadow="md" w='100%'>
                <CardBody>
                  <HStack justify="space-between">
                    <VStack align="start">
                      <Text fontSize="lg" fontWeight="bold">{location.name}</Text>
                      <Text>{location.address}</Text>
                      <Text>{location.postalCode}</Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default SearchLocation;

