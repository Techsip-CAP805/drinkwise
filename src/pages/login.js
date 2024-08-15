import React, { useState, useRef } from 'react';
import { useToast, Box, Container, Flex, Input, Button, InputGroup, Stack, Link, FormControl, FormHelperText, InputRightElement } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Router from 'next/router';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = async (event) => {
    event.preventDefault();

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
      <Navbar />
      <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
        <Flex flexDirection="column" width="100wh" height="100vh" justifyContent="center" alignItems="center">
          <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
            <Box minW={{ base: "90%", md: "468px" }}>
              <form onSubmit={handleLogin}>
                <Stack spacing={4} p="3rem" backgroundColor="#a0b2ab" boxShadow="md" borderRadius='2em'>
                  <FormControl>
                    <InputGroup>
                      <Input ref={emailRef} type="email" placeholder="you@domain.com" backgroundColor="whiteAlpha.900" required />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <Input
                        ref={passwordRef}
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        backgroundColor="whiteAlpha.900"
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormHelperText textAlign="right">
                      <Link _hover={{ color: 'teal' }}>forgot password?</Link>
                    </FormHelperText>
                  </FormControl>
                  <Button borderRadius={'2em'} type="submit" variant="solid" width="full" _hover={{ bg: 'teal' }}>
                    Login
                  </Button>
                </Stack>
              </form>
            </Box>
          </Stack>
          <Box>
            New to us? <Link href="/signUp" _hover={{ color: 'teal' }}> Sign Up </Link>
          </Box>
        </Flex>
        <Footer />
      </Container>
    </Box>
  );
};

export default Login;
