import React, { useRef } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Heading,
  VStack,
  useToast,
  Link,
  Center
} from '@chakra-ui/react';

const LoginPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log('Entered email:', email);
    console.log('Entered password:', password);

    try {
      const response = await fetch('/api/employeeLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('API response:', data);

      if (response.ok) {
        toast({
          title: 'Login successful.',
          description: data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Login failed.',
          description: data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error during login request:', error);
      toast({
        title: 'Login failed.',
        description: 'An error occurred. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="#bcc8c3">
      <Container w="100vw" minH="100vh" maxW="7xl" py={10}>
        <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
          <Link href="/employee/orders/incoming" my={3}>
            <Center>
              <Image src='/header-log.png' width={150} height={100} alt='logo'/>
            </Center>
          </Link>
          <VStack spacing={6} p={4} w="100%" align="center">
            <Heading color="white">Employee Login</Heading>
            <Box as="form" onSubmit={handleLogin} w={{ base: "90%", md: "80%", lg: "40%" }}>
              <VStack spacing={4}>
                <Input
                  ref={emailRef}
                  placeholder="you@domain.com"
                  type="email"
                  bg="white"
                  color="black"
                />
                <Input
                  ref={passwordRef}
                  placeholder="password"
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
    </Box>
  );
};

export default LoginPage;
