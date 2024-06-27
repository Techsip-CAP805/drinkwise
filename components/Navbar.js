import React from 'react';
import { Box, HStack, Link, Spacer, Flex, Center, IconButton, VStack, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg='gray.100' w='100%' h={24} boxShadow='lg'>
      <Flex direction='row' justify='space-between' align='center' w='100%' h='100%' px={8}>
        <Link>LogoHere</Link>
        <Spacer display={{ base: 'none', md: 'block' }} />
        <Flex direction='row' width='30%' justify='space-around' align='center' h='100%' display={{ base: 'none', lg: 'flex' }}>
          <Link href='/menu'>Menu</Link>
          <Link href='/location'>Location</Link>
          <Link href='/order'>Order Online</Link>
          <Link href='/contact'>Contact Us</Link>
        </Flex>
        <IconButton
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'flex', lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {isOpen && (
        <VStack
          display={{ base: 'flex', md: 'none' }}
          position='absolute'
          top={24}
          left={0}
          width='100%'
          bg='gray.100'
          boxShadow='lg'
          zIndex={10}
          spacing={4}
          p={4}
        >
          <Link href='/menu' onClick={onClose}>Menu</Link>
          <Link href='/location' onClick={onClose}>Location</Link>
          <Link href='/order' onClick={onClose}>Order Online</Link>
          <Link href='/contact' onClick={onClose}>Contact Us</Link>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
