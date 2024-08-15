import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import OrderSideNav from '@/components/OrderSideNav';
import { useSession } from 'next-auth/react';

const CustomerProfile = ({ locations }) => {
  const { data: session } = useSession();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (session) {
        try {
          const res = await fetch(`/api/getCustomerByID?id=${session.user.sub}`);
          const customerData = await res.json();
          setCustomer(customerData);
        } catch (error) {
          toast({
            title: "Failed to load customer data",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCustomerData();
  }, [session, toast]);

  const handleInputChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
  
    // Create a new object that excludes `orders` and `__v`
    const { orders, __v, ...profileData } = customer;
    
    console.log(profileData);
    try {
      const res = await fetch(`/api/updateCustomer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
  
      if (res.ok) {
        toast({
          title: "Profile updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      toast({
        title: "Failed to update profile",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setUpdating(false);
    }
  };
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box display="flex" minHeight="100vh">
      <OrderSideNav />
      <Container maxW="container.md" mt={10}>
        <Heading as="h2" size="xl" mb={6}>
          Your Profile
        </Heading>
        <VStack spacing={4} align="stretch">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input 
              name="username"
              value={customer.username || ''}
              onChange={handleInputChange}
              readOnly
            />
          </FormControl>
          <FormControl id="customerName">
            <FormLabel>Full Name</FormLabel>
            <Input
              name="customerName"
              value={customer.customerName || ''}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </FormControl>
          <FormControl id="emailAddress">
            <FormLabel>Email Address</FormLabel>
            <Input
              name="emailAddress"
              value={customer.emailAddress || ''}
              onChange={handleInputChange}
              readOnly
            />
          </FormControl>
          <FormControl id="preferredBranch">
            <FormLabel>Preferred Branch</FormLabel>
            <Select
              name="preferredBranch"
              value={customer.preferredBranch || ''}
              onChange={handleInputChange}
              placeholder="Select your preferred branch"
            >
              {locations.map((location) => (
                <option key={location._id} value={location.branchName}>
                  {location.branchName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl id="accountCreationDate">
            <FormLabel>Account Creation Date</FormLabel>
            <Input
              name="accountCreationDate"
              value={new Date(customer.accountCreationDate).toLocaleDateString()}
              readOnly
            />
          </FormControl>
          <Button
            colorScheme="teal"
            size="lg"
            onClick={handleUpdateProfile}
            isLoading={updating}
          >
            Update Profile
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export async function getServerSideProps(context) {
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
    const locations = await res.json();
    return {
      props: { locations },
    };
 }

export default CustomerProfile;
