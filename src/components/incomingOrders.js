import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, SimpleGrid, useColorModeValue, Button, HStack, useToast } from '@chakra-ui/react';

const IncomingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const cardBgColor = useColorModeValue("#f7f7f7", "#1a1a1a"); // Light and dark mode colors
  const cardTextColor = useColorModeValue("#333", "#fff");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/guestOrderApi`);
      const data = await res.json();
      if (res.ok) {
        const pendingOrders = data.customerOrders
          .map(customer => customer.orders
            .filter(order => order.orderStatus === 'pending')
            .map(order => ({ ...order, username: customer.username, emailAddress: customer.emailAddress, orderType: 'customer' })))
          .flat();
        setOrders(pendingOrders);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus, orderType) => {
    // Optimistically update the state
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      const res = await fetch(`/api/updateOrderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus, orderType }),
      });
  
      if (res.ok) {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId)); // Remove the order from the list
        toast({
          description: `Order ${newStatus === 'inProgress' ? 'accepted' : 'rejected'}`,
          status: newStatus === 'inProgress' ? 'success' : 'warning',
          duration: 5000,
          isClosable: true,
          position: "bottom-right"
        });
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      // Revert the optimistic update if the request fails
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, orderStatus: 'pending' } : order
        )
      );
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="#f0f0f0">
      <Box ml="250px">
        <Container w="100vw" minH="100vh" maxW="70vw" py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
            <VStack spacing={6} p={4} w="100%" align="center">
              <Heading color="gray.700" mb="40px">Incoming Orders</Heading>
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
                        <Box p={5}>
                        <Stack spacing={3}>
                          <Text textAlign="left" color="gray.700">Customer: {order.username}</Text>
                          <Text textAlign="left" color="gray.700">Email: {order.emailAddress}</Text>
                          {/* <Text textAlign="left" color="gray.700">Contact No: {order.phoneNumber}</Text> */}
                          <Box>
                            <Heading size="md" textAlign="left" color="gray.700" mt={4}>
                              Orders
                            </Heading>
                            {order.items.map((item, index) => (
                              <Box key={index} mt={3}>
                                <Text color={cardTextColor}>{item.quantity}x {item.drinkName} - ${((item.basePrice + item.toppingsTotal) * item.quantity).toFixed(2)} </Text>
                                {item.selectedToppings.length > 0 && (
                                  <Text ml={10} color={cardTextColor}>
                                    Add: {item.selectedToppings.toString()}
                                  </Text>
                                )}
                                <Text ml={10} color={cardTextColor}>Sugar: {item.selectedSugar} </Text>
                                <Text ml={10} color={cardTextColor}>Ice: {item.selectedIce} </Text>
                              </Box>
                            ))}
                          </Box>
                          <HStack spacing={4} mt={6} justify="center">
                            <Button backgroundColor="teal.500" textColor="gray.700" size="sm" w="30%" onClick={() => handleStatusChange(order._id, 'inProgress', order.orderType)}>Accept</Button>
                            <Button backgroundColor="gray.500" textColor="gray.700" size="sm" w="30%" onClick={() => handleStatusChange(order._id, 'rejected', order.orderType)}>Reject</Button>
                          </HStack>
                        </Stack>
                        </Box>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              ) : (
                <Text textAlign="center" color="gray.700">No Incoming Orders Found</Text>
              )}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );  
};

export default IncomingOrders;
