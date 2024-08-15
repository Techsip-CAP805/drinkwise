import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Card, CardBody, useColorModeValue, }from '@chakra-ui/react';

const EditAccountInfo = ({ initialData, setFormData }) => {
  const [formData, setLocalFormData] = useState(null);
  const toast = useToast();
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

  useEffect(() => {
    if (initialData) {
      setLocalFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setFormData(formData); 
      toast({
        title: 'Account updated.',
        description: 'Your account information has been updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating account:', error.message);
      toast({
        title: 'Error updating account.',
        description: error.message || 'An error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (!formData) {
    return <Box>FormData is loading or not found.</Box>; 
  }

  return (
    <Card
      borderRadius="lg"
      width={{ base: "90%", md: "80%", lg: "60%" }}
      overflow="hidden"
      boxShadow="md"
      bg={cardBgColor}
      mt={8}
    >
      <CardBody p={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="branchName">
              <FormLabel>Branch Name</FormLabel>
              <Input
                type="text"
                name="branchName"
                value={formData.branchName || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="SIN">
              <FormLabel>SIN</FormLabel>
              <Input
                type="number"
                name="SIN"
                value={formData.SIN || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="isAdmin">
              <FormLabel>Admin</FormLabel>
              <Input
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin || false}
                onChange={(e) => setLocalFormData({ ...formData, isAdmin: e.target.checked })}
              />
            </FormControl>
            <FormControl id="emailAddress">
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                name="emailAddress"
                value={formData.emailAddress || ''}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" w="100%">
              Save Changes
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default EditAccountInfo;
