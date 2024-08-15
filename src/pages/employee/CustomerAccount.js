import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, SimpleGrid, useColorModeValue, Button, HStack, useToast } from '@chakra-ui/react';
import SideNav from '@/components/SideNav';

const GuestOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/guestOrderApi`);
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
      } else {
        console.error('Failed to fetch guest orders');
      }
    } catch (error) {
      console.error('Error fetching guest orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`/api/updateOrderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus }),
      });

      if (res.ok) {
        setOrders(prevOrders =>
          prevOrders.filter(order => order._id !== orderId || order.orderStatus !== 'inProgress')
        );
        toast({
          description: `Order ${newStatus === 'inProgress' ? 'accepted' : 'rejected'}`,
          status: newStatus === 'inProgress' ? 'success' : 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="#bcc8c3">
      <SideNav />
      <Box ml="250px">
        <Container w="100vw" minH="100vh" maxW="7xl" py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
            <VStack spacing={6} p={4} w="100%" align="center">
              <Heading color="white">Incoming Guest Orders</Heading>
              {orders.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                  {orders.map((order) => (
                    <Card
                      key={order._id}
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                    >
                      <CardBody p={4}>
                        <Stack spacing={3}>
                          <Text textAlign="center" color="white">Contact: {order.contact}</Text>
                          <Text textAlign="center" color="white">Email: {order.email}</Text>
                          <Text textAlign="center" color="white">Phone: {order.phone}</Text>
                          <Box>
                            <Heading size="md" textAlign="center" color="white" mt={4}>
                              Orders
                            </Heading>
                            {order.items.map((item, index) => (
                              <Box key={index} p={4} bg="gray.700" borderRadius="md" mt={4}>
                                <Text color="white">Total Amount: ${item.totalAmount}</Text>
                                <Box mt={3}>
                                  <Heading size="sm" color="white">Items:</Heading>
                                  {item.items.map((drink, drinkIndex) => (
                                    <Text key={drinkIndex} color="white">
                                      {drink.itemName} - Quantity: {drink.quantity}
                                    </Text>
                                  ))}
                                </Box>
                                <HStack spacing={4} mt={6} justify="center">
                                  <Button colorScheme="green" w="50%" onClick={() => handleStatusChange(order._id, 'inProgress')}>Accept</Button>
                                  <Button colorScheme="red" w="50%" onClick={() => handleStatusChange(order._id, 'rejected')}>Reject</Button>
                                </HStack>
                              </Box>
                            ))}
                          </Box>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text textAlign="center" color="white">No guest orders found</Text>
              )}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default GuestOrders;
