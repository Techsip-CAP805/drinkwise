import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, Input, Button, HStack, useColorModeValue, } from '@chakra-ui/react';
import Navbar from "../../components/Navbar";
import SideNav from "../../components/SideNav";
import Footer from "../../components/Footer";
import EditAccountInfo from './editAccountInfo';
import employees from '../../../data/employeeData.json';

const EmployeeAccount = () => {
  const [formData, setFormData] = useState(null);
  const [employeeID, setEmployeeID] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

  const fetchEmployeeData = (id) => {
    setIsLoading(true);
    try {
      const employee = employees.find(emp => emp.employeeID === parseInt(id));
      if (employee) {
        setFormData(employee);
        console.log('Fetched data:', employee);
      } else {
        setFormData(null);
        console.error('Employee not found');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setFormData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setEmployeeID(e.target.value);
  };

  const handleFetchData = () => {
    if (employeeID) {
      fetchEmployeeData(employeeID);
    }
  };

  const incrementID = () => {
    setEmployeeID((prevID) => {
      const newID = prevID ? parseInt(prevID) + 1 : 1;
      fetchEmployeeData(newID);
      return newID.toString();
    });
  };
  
  const decrementID = () => {
    setEmployeeID((prevID) => {
      const newID = prevID ? Math.max(parseInt(prevID) - 1, 1) : 1;
      fetchEmployeeData(newID);
      return newID.toString();
    });
  };

  return (
    <Box bg="#bcc8c3">
      {/* <Navbar /> */}
      <SideNav />
      <Box ml="250px">
      <Container w="100vw" minH="100vh" maxW="7xl" py={10}>
        <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
          <VStack spacing={6} p={4} w="100%" align="center">
            <Heading color="white">Employee Account Information</Heading>
            <HStack>
              <Button onClick={decrementID} colorScheme="teal">
                -
              </Button>
              <Input
                placeholder="Enter Employee ID"
                value={employeeID}
                onChange={handleInputChange}
                width="200px"
              />
              <Button onClick={incrementID} colorScheme="teal">
                +
              </Button>
            </HStack>
            <Button onClick={handleFetchData} colorScheme="teal" isLoading={isLoading} mt={4}>
              Fetch Data
            </Button>
            <Card
              borderRadius="lg"
              width={{ base: "90%", md: "80%", lg: "60%" }}
              overflow="hidden"
              boxShadow="md"
              bg={cardBgColor}
              mt={4}
            >
              <CardBody p={4}>
                <Stack spacing={3}>
                  {formData ? (
                    <>
                      <Text textAlign="center" color="white">First Name: {formData.firstName}</Text>
                      <Text textAlign="center" color="white">Last Name: {formData.lastName}</Text>
                      <Text textAlign="center" color="white">Branch Name: {formData.branchName}</Text>
                      <Text textAlign="center" color="white">SIN: {formData.SIN}</Text>
                      <Text textAlign="center" color="white">Email: {formData.emailAddress}</Text>
                    </>
                  ) : (
                    <Text textAlign="center" color="white">No data found</Text>
                  )}
                </Stack>
              </CardBody>
            </Card>
            {formData && <EditAccountInfo initialData={formData} setFormData={setFormData} />}
          </VStack>
        </Flex>
      </Container>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default EmployeeAccount;
