import React from 'react';
import { Box, Spacer, Flex, IconButton, VStack, useDisclosure, useColorModeValue, Text } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { Mukta, Playfair_Display_SC} from 'next/font/google'

const mukta = Mukta({
  subsets: ['latin'],
  display: 'swap',
  weight: '500'
})



const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      w='100%'
      h={24}
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
        <Link href='/'><Image src='/header-log.png' width={150} height={100} alt='logo'/></Link>
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
          <Link href='/menu' mx={2} _hover={{}}><Text as='b' fontSize={['md', 'lg']} className={mukta.className} color='#374B43'>MENU</Text></Link>
          <Link href='/locations' mx={2} _hover={{}}><Text as='b' fontSize={['md', 'lg']} className={mukta.className} color='#374B43'>LOCATIONS</Text></Link>
          <Link href='/order/search-location' mx={2} _hover={{}}><Text as='b' fontSize={['md', 'lg']} className={mukta.className} color='#374B43'>ORDER ONLINE</Text></Link>
          <Link href='/contact' mx={2} _hover={{}}><Text as='b' fontSize={['md', 'lg']} className={mukta.className} color='#374B43'>CONTACT US</Text></Link>
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
