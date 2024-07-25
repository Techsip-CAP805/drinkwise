import React, { useContext, useRef } from 'react';
import { useToast, Box, Button, Container, Heading, Input, VStack, Text, Image, HStack } from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import Router from 'next/router';
import { signIn } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import SmallFooter from '@/components/SmallFooter';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();

  const handleLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      userType: 'customer' //for customer login
    });
    if (result.error) {
      toast({
        title: 'Login Failed',
        description: result.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      Router.push('/');
    }
  };

  return (
    <Box bg='#bcc8c3'>
      <Navbar/>
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
              Don&#39;t have an account? <Link href='/user/signUp' color='teal.500'>Sign Up</Link>
            </Text>
          </VStack>
        </Container>
      </Box>
      <SmallFooter/>
    </Box>
  );
};

export default SignIn;
