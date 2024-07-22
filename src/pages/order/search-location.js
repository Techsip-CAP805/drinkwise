// pages/locations.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Container,
  Input,
  Select,
  VStack,
  HStack,
  Divider,
  SimpleGrid,
  Card,
  CardBody
} from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { withRole } from '../../../lib/auth';

const SearchLocation = ({ session }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      const data = await res.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  const filteredLocations = locations
    .filter(location => location.branchName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.branchName.localeCompare(b.branchName);
      }
      return 0; // Replace with actual distance comparison if needed
    });

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
              <Link href={`/order/store/${location._id}`} key={index} passHref>
                <Card borderRadius="md" boxShadow="md">
                  <CardBody>
                    <HStack justify="space-between">
                      <VStack align="start">
                        <Text fontSize="lg" fontWeight="bold">{location.branchName}</Text>
                        <Text>{location.branchLocation.addressLine1}, {location.branchLocation.city}, {location.branchLocation.province}</Text>
                        <Text>{location.branchLocation.postalCode}</Text>
                      </VStack>
                    </HStack>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
      <Footer />
    </Box>
  );
};

//auth
export const getServerSideProps = withRole(['customer'], '/login');

export default SearchLocation;
