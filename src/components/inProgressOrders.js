import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, SimpleGrid, useColorModeValue, Button, HStack, useToast } from '@chakra-ui/react';

const InProgressOrders = () => {
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
        const guestOrders = data.guestOrders.filter(order => order.orderStatus === 'inProgress');
        setOrders(guestOrders);
      } else {
        console.error('Failed to fetch orders');
        toast({
          description: 'Failed to fetch orders',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        description: 'Error fetching orders',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
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
        body: JSON.stringify({ orderId, newStatus, orderType: 'guest' }),
      });

      if (res.ok) {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        toast({
          description: `Order marked as ${newStatus}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
      } else {
        console.error('Failed to update order status');
        toast({
          description: 'Failed to update order status',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        description: 'Error updating order status',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="#bcc8c3">
      <Box ml="250px">
        <Container w="100vw" minH="100vh" maxW="70vw" py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
            <VStack spacing={6} p={4} w="100%" align="center">
              <Heading color="white">In Progress Orders</Heading>
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
                          <Text textAlign="center" color="white">Contact: {order.contact}</Text>
                          <Text textAlign="center" color="white">Email: {order.email}</Text>
                          <Text textAlign="center" color="white">Phone: {order.phone}</Text>
                          <Box>
                            <Heading size="md" textAlign="center" color="white" mt={4}>
                              Order Items
                            </Heading>
                            {order.items.map((item, index) => (
                              <Box key={index} p={4} bg="gray.700" borderRadius="md" mt={4}>
                                <Text color="white">Total Amount: ${(item.basePrice * item.quantity).toFixed(2)}</Text>
                                <Box mt={3}>
                                  <Heading size="sm" color="white">Item:</Heading>
                                  <Text color="white">
                                    {item.drinkName} - Quantity: {item.quantity}
                                  </Text>
                                </Box>
                              </Box>
                            ))}
                          </Box>
                          {/* Move the Complete button outside of the map function */}
                          <HStack spacing={4} mt={6} justify="center">
                            <Button colorScheme="blue" textColor="white" size="sm" w="30%" onClick={() => handleStatusChange(order._id, 'completed')}>Complete</Button>
                          </HStack>
                        </Stack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text textAlign="center" color="white">No in-progress orders found</Text>
              )}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default InProgressOrders;
