import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, Card, CardBody, Stack, Container, Flex, SimpleGrid, useColorModeValue, Button, HStack, useToast } from '@chakra-ui/react';
import SideNav from "./SideNav";

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
        // const combinedOrders = [
        //   ...data.guestOrders.map(order => ({ ...order, orderType: 'guest' })),
        //   ...data.customerOrders.map(customer => customer.orders.map(order => ({ ...order, customerName: customer.customerName, orderType: 'customer' }))).flat()
        // ].filter(order => order.orderStatus === 'completed');
        const completedOrders = data.customerOrders
                .map(customer => customer.orders
                    .filter(order => order.orderStatus === 'completed')
                    .map(order => ({ ...order, username: customer.username, emailAddress: customer.emailAddress })))
                .flat();
        setOrders(completedOrders);
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

  const handleStatusChange = async (orderId, newStatus, orderType) => {
   

    try {
      const res = await fetch(`/api/updateOrderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus, orderType }),
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
        // Revert state change if update fails
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, orderStatus: 'inProgress' } : order
          )
        );
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
      // Revert state change if there's an error
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order._id === orderId ? { ...order, orderStatus: 'inProgress' } : order
        )
      );
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="#bcc8c3">
      <Box ml="250px">
        <Container w="100vw" minH="100vh" maxW="50vw" py={10}>
          <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
            <VStack spacing={6} p={4} w="100%" align="center">
              <Heading color="white">Completed Orders</Heading>
              {orders.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={6} w="100%">
                  {orders.map((order) => (
                    <Card
                      key={order._id}
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="md"
                      bg={cardBgColor}
                      align={"center"}
                     
                    >
                      <CardBody p={4}>
                        <Stack spacing={3}>
                          {order.orderType === 'guest' && (
                            <>
                              <Text textAlign="center" color="white">Name: {order.contact} Email: {order.email}</Text>
                              {/* <Text textAlign="center" color="white">Email: {order.email}</Text>
                              <Text textAlign="center" color="white">Phone: {order.phone}</Text> */}
                            </>
                          )}
                          {order.orderType === 'customer' && (
                            <>
                              <Text textAlign="center" color="white">Customer Name: {order.customerName}</Text>
                              <Text textAlign="center" color="white">Total Amount: ${(order.totalAmount).toFixed(2)}</Text>
                            </>
                          )}
                          <Box>
                            <Heading size="md" textAlign="center" color="white" mt={4}>
                              Order Items
                            </Heading>
                            {order.items.map((item, index) => (
                              <Box key={index} p={4} justify = "center" align="center" borderRadius="md" mt={4}>
                                <Text color="white">Total Amount: ${(item.basePrice * item.quantity).toFixed(2)}</Text>
                                <Box mt={3}>
                                  <Heading size="sm" color="white">Item:</Heading>
                                  <Text color="white">
                                    {item.drinkName} - Quantity: {item.quantity}
                                  </Text>
                                </Box>
                                <HStack spacing={4} mt={6} justify="center">
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
