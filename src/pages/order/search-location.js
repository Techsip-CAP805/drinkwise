import React, { useState, useContext } from 'react';
import {
  Box,
  Text,
  Container,
  Input,
  Select,
  VStack,
  HStack,
  IconButton,
  Divider,
  SimpleGrid,
  Card,
  CardBody
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Navbar from '@/components/Navbar';
import { DrinkContext } from '../../../context/drinkContext';
import Link from 'next/link';
import Footer from '@/components/Footer';

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
            />
            <Divider />
          </Box>

          <HStack spacing={4} align='center'>
            <Text fontSize='lg' fontWeight='bold'>sort by:</Text>
            <Select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              maxW='150px'
            >
              <option value='name'>Name</option>
              <option value='distance'>Distance</option>
            </Select>
          </HStack>

          <SimpleGrid columns={{ base: 1 }} spacing={5}>
            {filteredLocations.map((location, index) => (
              <Link href={`/order/store/${location.id}`} key={index} passHref>
                  <Card borderRadius="md" boxShadow="md">
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
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
      <Footer/>
    </Box>
  );
};

export default SearchLocation;
