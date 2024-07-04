import React, { useContext } from 'react';
import { DrinkContext } from '../../context/drinkContext';
import { Box, Container, Flex } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';

const Home = () => {
  const { locations, setLocations } = useContext(DrinkContext);

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Navbar />
      <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
        <Flex direction='row' w='100%' h='100%' justify='center' align='center'  pt={40}>
          <Link href='/recommendation'>
            <Box
              width="400px"
              height="500px"
              bg='gray.100'
              display='flex'
              direction='row'
              justifyContent='center'
              alignItems='center'
              _hover={{ bg: 'tomato' }}
              position='relative'
              overflow='hidden'
              css={{
                clipPath: 'path("M50,0 Q200,0 350,0 L350,400 Q200,500 50,400 Z")'
              }}
            >
              <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src='/KidsEnjoyingTea.mp4' type='video/mp4' />
              </video>
            </Box>
          </Link>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;
