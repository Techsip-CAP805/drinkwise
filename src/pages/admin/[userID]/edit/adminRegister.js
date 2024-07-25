import React, { useRef, useState } from 'react';
import {
  Box, Container, Flex, Text, Heading, Input, Button, InputGroup, Stack, FormControl, InputRightElement, useToast, Tooltip
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons'; // Import InfoIcon from Chakra UI
import Navbar from '../../../../components/Navbar';
import Footer from '../../../../components/Footer';
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
    
    <Box bg='#e2e8f0'>
       
      <AdminSideNav />
      
      <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
        <Flex
          flexDirection="column"
          width="100wh"
          height="100vh"
          justifyContent="center"
          alignItems="center"
        >
          
          <Stack
            flexDir="column"
            mb="2"
            justifyContent="center"
            alignItems="center"
          >
            <Box minW={{ base: "90%", md: "468px" }}>
            <Heading align='center' fontSize='2xl' mb={4}>Register a new employee</Heading>
              <form onSubmit={handleRegister}>
                <Stack
                  spacing={4}
                  p="3rem"
                  backgroundColor="gray.300"
                  boxShadow="md"
                  borderRadius='2em'
                >
                  <FormControl>
                    <InputGroup>
                      <Input
                        ref={employeeIDRef}
                        type="number"
                        placeholder="Employee ID"
                        backgroundColor="whiteAlpha.900"
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
                        backgroundColor="whiteAlpha.900"
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
                        backgroundColor="whiteAlpha.900"
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
                        backgroundColor="whiteAlpha.900"
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
                        backgroundColor="whiteAlpha.900"
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
                        backgroundColor="whiteAlpha.900"
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <Button
                    borderRadius={'2em'}
                    type="submit"
                    variant="solid"
                    width="full"
                    _hover={{ bg: 'teal' }}
                  >
                    Register Employee
                  </Button>
                  <Tooltip label="Password must be at least 8 characters long and contain at least one letter, one number, and one special character." aria-label="Password requirements">
                    <InfoIcon ml={4} color="white" />
                  </Tooltip>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
        
      </Container>
    </Box>
  );
};


//auth
export const getServerSideProps = withRole(['admin'], '/admin/login');

export default AdminRegisterEmployee;
