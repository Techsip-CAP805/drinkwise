import React from 'react';
import { Box, Container, Flex, Heading, VStack, Text, Button, IconButton } from '@chakra-ui/react';
import { ArrowDownIcon } from '@chakra-ui/icons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmallFooter from '@/components/SmallFooter';
import { Link } from '@chakra-ui/next-js'

const OrderPage = () => {
  return (
    <Box bg='#bcc8c3' minH='100vh'>
    <Navbar/>
    <Container w='100vw' h='95vh' maxW='7xl' pt='10vh'>
    <Flex maxW='7xl' pb={32} textAlign='center' h='100%' direction='row' justify='center' align='center'>
      <Box py={8} borderRadius='md' boxShadow='lg' border='2px solid #026670' w='70%'>
        <Text fontSize='sm' color='#026670' bg='#F9BC60' py={2} borderRadius='md' mb={4}>
          Self-Pickup & Delivery are AVAILABLE for all locations now
        </Text>
        <Text fontSize='md' color='#444'>Please use the following button for self pickup option</Text>
        <Link href='/order/search-location'><Button mt={4} mb={4} colorScheme='blue'>Online Order is Available for All Locations</Button></Link>
        <Text fontSize='md' color='#444'>Please use Fantuan and Uber Eats for delivery</Text>
      </Box>
    </Flex>
  </Container>
<SmallFooter/>
  </Box>
  );
};

export default OrderPage;
