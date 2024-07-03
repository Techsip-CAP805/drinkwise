import { VStack, Text, Flex, Box, Spacer, Center, useColorModeValue, HStack, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  const bgColor = useColorModeValue('#b9c6c0', '#2D3748');
  const textColor = useColorModeValue('gray.700', 'gray.200');

  return (
    <Box w='100%' color={textColor} boxShadow='md' bg={useColorModeValue('#ffffff40', '#20202380')}
    backdropFilter='auto'
    backdropBlur='8px'>
      <Flex
        w='100%'
        maxW='1200px'
        mx='auto'
        px={8}
        py={8}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'center', md: 'stretch' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} mb={{ base: 8, md: 0 }}>
          <Text fontSize='lg' fontWeight='bold'>Contact Us</Text>
          <Text>(416) 551-9666</Text>
          <Text>drinkwise@gmail.com</Text>
          <Text>420 Yonge St, North York, ON M2N5V5, Canada</Text>
        </VStack>
        <Spacer display={{ base: 'none', md: 'block' }} />
        <VStack align='center' mb={{ base: 8, md: 0 }}>
          <Center w='full' h={24}>
            <Box as='span' fontSize='3xl' fontWeight='bold'>LOGO</Box>
          </Center>
          <HStack spacing={4}>
            <Link href='/privacy' fontSize='sm' _hover={{ textDecoration: 'underline' }}>Privacy Policy</Link>
            <Link href='/terms' fontSize='sm' _hover={{ textDecoration: 'underline' }}>Terms of Service</Link>
          </HStack>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Footer;
