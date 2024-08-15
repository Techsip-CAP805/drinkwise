import React, { useEffect, useState } from 'react';
import OrderSideNav from '@/components/OrderSideNav';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, SimpleGrid, useColorModeValue, Button, HStack, useToast } from '@chakra-ui/react';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState(null);
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

  const getCustomerInfo = async () => {
    if (!session?.user?.sub) return;  // Exit if session is not available

    try {
      const customerRes = await fetch(`/api/getCustomerByID?id=${session.user.sub}`);
      const customerInfo = await customerRes.json();
      setCustomer(customerInfo);
      setOrders(customerInfo.orders);
      console.log(customerInfo);
    } catch (error) {
      console.error('Failed to fetch customer info:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getCustomerInfo();
    }

    console.log("CUSTOMER: ", customer);
  }, [session, status]);

  const renderContent = () => {
    const { section } = router.query;

    switch (section) {
      case 'orders':
        return (
          <div>
            <h2>Your Orders</h2>
            {customer?.orders?.length > 0 ? (
              <ul>
                {customer.orders.map((order, index) => (
                  <li key={index}>{order}</li> // Display order details here
                ))}
              </ul>
            ) : (
              <p>You have no orders yet.</p>
            )}
          </div>
        );
      case 'catalog':
        return <div>Product Catalog</div>;
      case 'payment':
        return <div>Payment Information</div>;
      case 'location':
        return <div>Change Location</div>;
      case 'language':
        return <div>Language Settings</div>;
      case 'signin':
        return <div>Sign In</div>;
      default:
        return (
          <div>
            <h2>Welcome to your dashboard, {customer?.customerName || customer?.username}!</h2>
            <p><strong>Email Address:</strong> {customer?.emailAddress}</p>
            <p><strong>Preferred Branch:</strong> {customer?.preferredBranch || "No preferred branch selected"}</p>
            <p><strong>Account Creation Date:</strong> {new Date(customer?.accountCreationDate).toLocaleDateString()}</p>
          </div>
        );
    }
  };

  const cap = (str) => {
    if (!str) return str; // Handle empty or null strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  if (status === 'loading' || !customer) {
    return <div>Loading...</div>;  // Loading state while fetching data
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <OrderSideNav />
      <main style={{ flex: 1, padding: '20px' }}>
        {renderContent()}
      </main>

      {/* From In Progress */}
    <Box bg="#bcc8c3">
      <Box ml="250px">
        <Container w="100vw" minH="100vh" maxW="70vw" py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
            <VStack spacing={6} p={4} w="100%" align="center">
              <Heading color="white">My Orders</Heading>
              {orders.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="100%">
                  {orders.map((order) => (
                    <Card
                      key={order._id}
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                      maxW="500px"
                      w="100%"
                    >
                      <CardBody p={4}>
                        <Stack spacing={3}>
                          <Box p="16px">
                          <Text color="white">
                                    Status: {cap(order.orderStatus)}
                          </Text>
                          </Box>
                          <Box>
                            {order.items.map((item, index) => (
                              <Box key={index} p={4} borderRadius="md">
                                <Text color="white">Total Amount: ${(item.basePrice * item.quantity).toFixed(2)}</Text>
                                <Box mt={3}>
                                  <Heading size="sm" color="white">Item:</Heading>
                                  <Text color="white"> 
                                    {item.drinkName} - Quantity: {item.quantity}
                                  </Text>
                                </Box>
                                {/* <HStack spacing={4} mt={6} justify="center">
                                  <Button colorScheme="blue" textColor="white" size="sm" w="30%" onClick={() => handleStatusChange(order._id, 'completed')}>Complete</Button>
                                </HStack> */}
                              </Box>
                            ))}
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text textAlign="center" color="white">No orders found</Text>
              )}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
    </div>
  );
};

export default CustomerDashboard;
