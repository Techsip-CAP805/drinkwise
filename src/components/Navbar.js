import React from 'react';
import { Box, Link, Spacer, Flex, IconButton, VStack, useDisclosure, useColorModeValue, Text } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w='100%'
      h='10vh'
      boxShadow='lg'
      color='white'
      display='flex'
      bg={useColorModeValue('#ffffff40', '#20202380')}
      backdropFilter='auto'
      backdropBlur='8px'
      position='fixed'
      flexWrap='wrap'
      zIndex={1}
    >
      <Flex
        direction='row'
        justify='space-between'
        align='center'
        w='100%'
        h='100%'
        px={{ base: 4, md: 20 }}
        wrap='wrap'
      >
        <Link href='/'><Text as='b' fontSize='lg'>Drinkwise</Text></Link>
        <Spacer display={{ base: 'none', lg: 'block' }} />
        <Flex
          direction='row'
          justify='space-around'
          align='center'
          h='100%'
          w='40%'
          display={{ base: 'none', lg: 'flex' }}
          spacing={4}
        >
          <Link href='/employee/incomingOrders' mx={2}><Text as='b' fontSize='md'>Employee</Text></Link>
          <Link href='/menu' mx={2}><Text as='b' fontSize='md'>Menu</Text></Link>
          <Link href='/locations' mx={2}><Text as='b' fontSize='md'>Locations</Text></Link>
          <Link href='/order/search-location' mx={2}><Text as='b' fontSize='md'>Order Online</Text></Link>
          <Link href='/contact' mx={2}><Text as='b' fontSize='md'>Contact Us</Text></Link>
        </Flex>
        <IconButton
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: 'flex', lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          size='lg'
          height={12}
        />
      </Flex>
      {isOpen && (
        <VStack
          display={{ base: 'flex', lg: 'none' }}
          position='absolute'
          top={24}
          left={0}
          width='100%'
          bg='#c9d3cf'
          boxShadow='lg'
          zIndex={10}
          spacing={4}
          p={4}
        >
          <Link href='/menu' onClick={onClose} py={3}><Text as='b' fontSize='md'>Menu</Text></Link>
          <Link href='/location' onClick={onClose} py={3}><Text as='b' fontSize='md'>Location</Text></Link>
          <Link href='/order' onClick={onClose} py={3}><Text as='b' fontSize='md'>Order Online</Text></Link>
          <Link href='/contact' onClick={onClose} py={3}><Text as='b' fontSize='md'>Contact Us</Text></Link>
        </VStack>
      )}
    </Box>
  );
};

export default Navbar;
