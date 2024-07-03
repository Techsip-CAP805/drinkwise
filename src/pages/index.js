import React, {useState, useContext} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import {Box, Container, Text, Flex, Center} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link'

const Home = () => {

  const {locations, setLocations} = useContext(DrinkContext)

  //main page
  return (
    <Box bg='#bcc8c3'>
      <Navbar/>
      <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
      <Flex direction='row'  w='100%' h='100%' justify='center' align='center' pb={40}>
      <Link href='/recommendation'>
        <Box width={60} h={80} bg='gray.100' borderRadius='2rem' display='flex' direction='row' justifyContent='center' alignItems='center' _hover={{bg:'tomato'}}>
        <Text>.mp4 is inserted here</Text>
        </Box>
      </Link>
      </Flex>
      </Container>
      <Footer/>
    </Box>
  )
}

export default Home