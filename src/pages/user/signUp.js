import React, { useRef, useState } from 'react';
import {
  Box, Container, Flex, Input, Button, InputGroup, Stack, Link, FormControl, InputRightElement, useToast, Tooltip, Heading, Text
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import Navbar from '@/components/Navbar';
import SmallFooter from '@/components/SmallFooter';
import { useDrinkContext } from '../../../context/drinkContext';

export const validatePasswordReq = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
}

const SignUp = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toast = useToast();

  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignUp = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const toastMessages = {
      signUpSuccess: {
        title: 'Sign Up successful.',
        description: `Welcome, ${username}! You have successfully signed up.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      },
      signUpFailedPassword: {
        title: 'Sign Up failed.',
        description: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      },
      signUpFailedMatch: {
        title: 'Sign Up failed.',
        description: "Passwords do not match.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      },
      signUpFailedEmail: {
        title: 'Sign Up failed.',
        description: "Email already exists.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      },
      signUpFailed: {
        title: 'Sign Up failed.',
        description: "Something went wrong. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      }
    };

    if (!validatePasswordReq(password)) {
      toast(toastMessages.signUpFailedPassword);
      return;
    } else if (!validateConfirmPassword(password, confirmPassword)) {
      toast(toastMessages.signUpFailedMatch);
      return;
    }

    try {
      const response = await fetch('/api/customerRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, emailAddress: email, password: password }),
      });

      if (response.ok) {
        emailRef.current.value = '';
        usernameRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';
        setShowPassword(false);
        setShowConfirmPassword(false);
        toast(toastMessages.signUpSuccess);
      } else if (response.status === 400) {
        toast(toastMessages.signUpFailedEmail);
      } else {
        toast(toastMessages.signUpFailed);
      }
    } catch (error) {
      console.error('Error registering customer:', error);
      toast(toastMessages.signUpFailed);
    }
  };

  return (
    <Box bg='#bcc8c3' minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Container maxW='lg' py={12} px={6} mt={24} flex="1">
        <Flex justifyContent='center'>
          <Stack spacing={6} mx='auto' w='100%' maxW='lg' py={12} px={6}>
            <Stack align='center'>
              <Heading fontSize='3xl'>Create an account</Heading>
              <Text fontSize='md' color='gray.600'>
                to enjoy all our cool features ✌️
              </Text>
            </Stack>
            <Box
              rounded='lg'
              bg='white'
              boxShadow='lg'
              p={8}
            >
              <Stack spacing={4}>
                <form onSubmit={handleSignUp}>
                  <FormControl id='email' isRequired>
                    <Input ref={emailRef} type='email' placeholder='you@domain.com' bg='gray.100' />
                  </FormControl>
                  <FormControl id='username' isRequired>
                    <Input ref={usernameRef} type='text' placeholder='Username' bg='gray.100' />
                  </FormControl>
                  <FormControl id='password' isRequired>
                    <InputGroup>
                      <Input
                        ref={passwordRef}
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        bg='gray.100'
                      />
                      <InputRightElement width='4.5rem'>
                        <Button variant='ghost' onClick={handleShowPasswordClick}>
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl id='confirmPassword' isRequired>
                    <InputGroup>
                      <Input
                        ref={confirmPasswordRef}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        bg='gray.100'
                      />
                      <InputRightElement width='4.5rem'>
                        <Button variant='ghost' onClick={handleShowConfirmPasswordClick}>
                          {showConfirmPassword ? 'Hide' : 'Show'}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={6} pt={2}>
                    <Button
                      loadingText='Submitting'
                      size='lg'
                      bg='teal.400'
                      color='white'
                      _hover={{ bg: 'teal.500' }}
                      type='submit'
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </form>
                <Stack pt={4}>
                  <Text align='center'>
                    Already a user? <Link color='teal.400' href='/login'>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Container>
      <SmallFooter/>
    </Box>
  );
};

export default SignUp;
