import React, { useEffect, useState } from 'react';
import OrderSideNav from '@/components/OrderSideNav';
import { useSession } from 'next-auth/react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, Divider, HStack, useColorModeValue } from '@chakra-ui/react';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const { data: session, status } = useSession();
  const cardBgColor = useColorModeValue("#f7f7f7", "#1a1a1a"); // Light and dark mode colors
  const cardTextColor = useColorModeValue("#333", "#fff");

  const getCustomerInfo = async () => {
    if (!session?.user?.sub) return;  // Exit if session is not available

    try {
      const customerRes = await fetch(`/api/getCustomerByID?id=${session.user.sub}`);
      const customerInfo = await customerRes.json();
      setCustomer(customerInfo);
    } catch (error) {
      console.error('Failed to fetch customer info:', error);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      getCustomerInfo();
    }
  }, [session, status]);

  const cap = (str) => {
    if (!str) return str; // Handle empty or null strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const sortOrders = (orders) => {
    return orders.sort((a, b) => {
      if (a.orderStatus === 'pending' && b.orderStatus !== 'pending') {
        return -1;
      }
      if (a.orderStatus !== 'pending' && b.orderStatus === 'pending') {
        return 1;
      }
      return 0;
    });
  };

  if (status === 'loading' || !customer) {
    return <div>Loading...</div>;  // Loading state while fetching data
  }

  const sortedOrders = sortOrders(customer.orders);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <OrderSideNav />
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f0f0f0' }}>
        <Container maxW="container.md" py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h="100%">
            <VStack spacing={6} p={4} w="100%" align="start">
              <HStack spacing={2} w="100%" align="center" justifyContent="space-between">
                <Heading as="h2" size="lg" fontWeight="bold" color={cardTextColor}>
                  My Orders
                </Heading>
                <Text as="span" color="gray.500" fontWeight="medium" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                  Refresh
                </Text>
              </HStack>
              <Divider borderColor="blackAlpha.300" />

              {sortedOrders && sortedOrders.length > 0 ? (
                <VStack spacing={6} w="100%">
                  {sortedOrders.map((order) => (
                    <Card
                      key={order._id}
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                      w="100%"
                      p={4}
                    >
                      <CardBody>
                        <Stack spacing={3}>
                          <Box>
                            <Text color={cardTextColor} fontWeight="bold" fontSize="lg">
                              Status: {cap(order.orderStatus)}
                            </Text>
                          </Box>
                          <Box>
                            {order.items.map((item, index) => (
                              <Box key={index} mt={3}>
                                <Text color={cardTextColor}>Total Amount: ${(item.basePrice * item.quantity).toFixed(2)}</Text>
                                <Text color={cardTextColor}>Item: {item.drinkName} - Quantity: {item.quantity}</Text>
                              </Box>
                            ))}
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </VStack>
              ) : (
                <Text textAlign="center" color={cardTextColor}>No orders found</Text>
              )}
            </VStack>
          </Flex>
        </Container>
      </main>
    </div>
  );
};

export default CustomerDashboard;
