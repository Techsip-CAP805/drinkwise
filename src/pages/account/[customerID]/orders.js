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
  const cardBgColor = useColorModeValue("#ffffff", "#000000");

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

      <Box bg='gray.200'>
        <Box>
          <Container w="100vw" minH="100vh" maxW="100vw" py={10}>
            <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
              <VStack spacing={6} p={4} w="100%" align="center">
                <Heading color="gray.700">My Orders</Heading>
                {orders.length > 0 ? (
                  <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6} w="100%" alignItems="center">
                    {orders.map((order) => (
                      <Card
                        key={order._id}
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        bg={cardBgColor}
                        maxW="500px"
                        w="100%"
                        m="auto" // Center the card horizontally
                      >
                        <CardBody>
                          <Stack spacing={3}>
                            <Box px="16px">
                              <Text color="gray.700">
                                Status: {cap(order.orderStatus)}
                              </Text>
                              <Text color="gray.700">
                                Order Method: {cap(order.orderingMethod)}
                              </Text>
                              <Text color="gray.700">
                                Payment Method: {cap(order.paymentMethod)}
                              </Text>
                            </Box>
                            <Box>
                              <Text size="sm" color="gray.700" mx={4}>Order:</Text>
                              {order.items.map((item, index) => (
                                <Box key={index} borderRadius="md">
                                  <Box mt={3}>
                                    <Text color="gray.700" ml={10}>
                                      {item.quantity}x {item.drinkName}
                                    </Text>
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          </Stack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text textAlign="center" color="gray.700">No orders found</Text>
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
