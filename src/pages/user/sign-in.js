import React, { useContext, useRef } from 'react';
import { Box, Button, Container, Heading, Input, VStack, Text, Image, HStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  };

  return (
    <Box bg='#bcc8c3' minH='100vh' display='flex' alignItems='center' justifyContent='center'>
      <Container maxW='md' bg='white' p={6} borderRadius='md' boxShadow='lg'>
        <VStack spacing={4} align='center'>
          <Heading as='h1' size='lg' mb={6} color='#026670'>Login to Account</Heading>
          <Input 
            placeholder='Email'
            ref={emailRef}
            bg='gray.100'
          />
          <Input 
            placeholder='Password'
            type='password'
            ref={passwordRef}
            bg='gray.100'
          />
          <Button colorScheme='teal' width='full' onClick={handleLogin}>
            Sign In
          </Button>
          <Text>
            Don&#39;t have an account? <Link href='/signup' color='teal.500'>Sign Up</Link>
          </Text>
        </VStack>
      </Container>
    </Box>
  );
};

export default SignIn;
