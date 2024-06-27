import React from 'react';
import {Box, HStack, Link, Spacer, Flex, Center} from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg='gray.100' w='100%' h={24} boxShadow='lg'>
    <Flex direction='row' justify='center' align='center' w='100%' h='100%' px={8}>
    <Link>LogoHere</Link>
    <Spacer/>
    <Flex direction='row' width='30%' justify='space-around' align='center' h='100%'>
      <Link href='/menu'>Menu</Link>
      <Link href= 'location'>Location</Link>
      <Link href='/order'>Order Online</Link>
      <Link href='/contact'>Contact Us</Link>
    </Flex>
    </Flex>
    </Box>
  )
}

export default Navbar