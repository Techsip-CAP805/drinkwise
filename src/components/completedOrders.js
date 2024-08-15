import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, VStack, Container, Flex, Table, Thead, Tbody, Tr, Th, Td, useColorModeValue, useToast } from '@chakra-ui/react';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/guestOrderApi`);
      const data = await res.json();
      if (res.ok) {
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

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box bg="#f0f0f0" maxW="100vw" minH="100vh" mb="200px">
      <Box ml="250px">
        <Container w="100%" maxW="100vw" maxH="100vh" py={10}>
          <Flex direction="column" w="100%" h="100%" mt={20}>
            <VStack spacing={6} p={4} w="100%" align="center">
              <Heading color="gray.700" mb="40px">Completed Orders</Heading>
              {orders.length > 0 ? (
                <Box w="100%" overflowX="auto">
                  <Table variant="simple" size="lg" width="100%" border="1px" borderColor="gray.400">
                    <Thead>
                      <Tr>
                        <Th color="gray.700" width="20%" borderBottom="2px" borderRight="1px" borderColor="gray.400">Customer Name</Th>
                        <Th color="gray.700" width="30%" borderBottom="2px" borderRight="1px" borderColor="gray.400">Email</Th>
                        <Th color="gray.700" width="50%" borderBottom="2px" borderRight="1px" borderColor="gray.400">Items</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map((order) => (
                        <Tr key={order._id} borderBottom="1px" borderColor="gray.200">
                          <Td color="gray.700" width="20%" borderRight="1px" borderColor="gray.400">{order.username ? order.username : order.emailAddress}</Td>
                          <Td color="gray.700" width="30%" borderRight="1px" borderColor="gray.400">{order.emailAddress || order.email}</Td>
                          <Td color="gray.700" width="50%" borderRight="1px" borderColor="gray.400">
                            {order.items.map((item, index) => (
                              <Text key={index} color="gray.700">
                                {item.quantity}x {item.drinkName} - ${((item.basePrice + item.toppingsTotal) * item.quantity).toFixed(2)}
                              </Text>
                            ))}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              ) : (
                <Text textAlign="center" color="gray.700">No completed orders found</Text>
              )}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default CompletedOrders;
