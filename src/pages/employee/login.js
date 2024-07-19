import React, { useRef } from 'react';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SideNav from "../../components/SideNav";

import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Heading,
  VStack,
  useToast,
} from '@chakra-ui/react';

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === 'test@example.com' && password === 'password') {
      toast({
        title: 'Login successful.',
        description: "You have successfully logged in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else if (email === '') {
      toast({
        title: 'Login failed.',
            description: "Email field is required.",
            status: 'error',
            duration: 5000,
            isClosable: true,
      });
    } else if (password === '') {
      toast({
        title: 'Login failed.',
            description: "Password field is required.",
            status: 'error',
            duration: 5000,
            isClosable: true,
      });
    } else {
      toast({
        title: 'Login failed.',
        description: "Invalid email or password.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Box bg="#bcc8c3">
      <Navbar />
      <SideNav />
      <Container w="100vw" minH="100vh" maxW="7xl" py={10}>
        <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
          <VStack spacing={6} p={4} w="100%" align="center">
            <Heading color="white">Employee Login</Heading>
            <Box as="form" onSubmit={handleLogin} w={{ base: "90%", md: "80%", lg: "40%" }}>
              <VStack spacing={4}>
                <Input
                  ref={emailRef}
                  placeholder="Email"
                  type="email"
                  bg="white"
                  color="black"
                />
                <Input
                  ref={passwordRef}
                  placeholder="Password"
                  type="password"
                  bg="white"
                  color="black"
                />
                <Button type="submit" colorScheme="teal" w="full">
                  Login
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default LoginPage;
