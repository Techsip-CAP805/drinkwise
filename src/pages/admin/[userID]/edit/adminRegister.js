import React, { useRef, useState } from 'react';
import {
  Box, Container, Flex, Text, Heading, Input, Button, InputGroup, Stack, FormControl, InputRightElement, useToast, Tooltip
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import AdminSideNav from '@/components/AdminSideNav';
import { withRole } from '../../../../../lib/auth';

export const validatePasswordReq = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

const AdminRegisterEmployee = () => {
  const employeeIDRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const branchNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();

    const employeeID = employeeIDRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const branchName = branchNameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!validatePasswordReq(password)) {
      toast({
        title: 'Registration failed.',
        description: "Password must be at least 8 characters long and contain at least one letter, one number, and one special character.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('/api/employeeRegisterApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeID, firstName, lastName, branchName, emailAddress: email, password }),
      });

      if (response.ok) {
        employeeIDRef.current.value = '';
        firstNameRef.current.value = '';
        lastNameRef.current.value = '';
        branchNameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        setShowPassword(false);
        toast({
          title: 'Employee registered.',
          description: `Employee ${firstName} ${lastName} registered successfully.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Registration failed.',
          description: 'Email already exists or other error occurred.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error registering employee:', error);
      toast({
        title: 'Registration failed.',
        description: 'Something went wrong. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg='#f7f7f7' minH='100vh'>
      <AdminSideNav />
      <Container w='100%' maxW='7xl' minH='100vh' centerContent>
        <Flex
          flexDirection="column"
          width="100%"
          justifyContent="center"
          alignItems="center"
          h="100vh"
        >
          <Box minW={{ base: "90%", md: "468px" }} bg="white" p="3rem" borderRadius="lg" boxShadow="xl">
            <Heading align='center' fontSize='2xl' mb={6}>Register a new employee</Heading>
            <form onSubmit={handleRegister}>
              <Stack spacing={4}>
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={employeeIDRef}
                      type="number"
                      placeholder="Employee ID"
                      bg="gray.50"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={firstNameRef}
                      type="text"
                      placeholder="First Name"
                      bg="gray.50"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={lastNameRef}
                      type="text"
                      placeholder="Last Name"
                      bg="gray.50"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={branchNameRef}
                      type="text"
                      placeholder="Branch Name"
                      bg="gray.50"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={emailRef}
                      type="email"
                      placeholder="Email"
                      bg="gray.50"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <Input
                      ref={passwordRef}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      bg="gray.50"
                      required
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick} variant='outline'>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={'full'}
                  type="submit"
                  variant="outline"
                  colorScheme="teal"
                  width="full"
                >
                  Register Employee
                </Button>
                <Tooltip label="Password must be at least 8 characters long and contain at least one letter, one number, and one special character." aria-label="Password requirements">
                  <InfoIcon ml={2} color="gray.500" />
                </Tooltip>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

//auth
export const getServerSideProps = withRole(['admin'], '/admin/login');

export default AdminRegisterEmployee;
