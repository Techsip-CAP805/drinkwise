import React from "react";
import {
  VStack,
  Text,
  Heading,
  Card,
  CardBody,
  Stack,
  Button,
  useColorModeValue,
  HStack,
  Box,
} from "@chakra-ui/react";

const OrdersColumn = ({ orders, onStatusChange }) => {
  const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

  const handleStatusChange = (customerId, orderId, newStatus) => {
    onStatusChange(customerId, orderId, newStatus);
  };

  return (
    <Box px={{ base: 4, md: 12 }} mb={10}>
      <VStack align="center">
        {orders.map((order, index) => (
          <Card
            key={index}
            borderRadius="lg"
            
            overflow="hidden"
            boxShadow="md"
            bg={cardBgColor}
            mb={4}
            width="100%" 
            maxW="full"
          >
            <CardBody p={4}>
              <Stack spacing={3}>
                <Heading size="md" textAlign="center" color="white">
                  Order ID: {order.orderID}
                </Heading>
                <Text textAlign="center" color="white">
                  Order Date: {new Date(order.orderDate).toLocaleDateString("en-US")}
                </Text>
                <Text color="white" fontSize="md" textAlign="center">
                  Total Amount: ${order.totalAmount}
                </Text>
                <Box mt={3}>
                  <Heading size="sm" color="white">Items:</Heading>
                  {order.items.map((item, index) => (
                    <Text key={index} color="white">
                      {item.itemName} - Quantity: {item.quantity}
                    </Text>
                  ))}
                </Box>
                <HStack spacing={4} mt={6} justify="center">
                  {order.orderStatus === "pending" && (
                    <>
                      <Button
                        onClick={() =>
                          handleStatusChange(order.customerId, order.orderID, "inProgress")
                        }
                        colorScheme="green"
                        w="50%"
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() =>
                          handleStatusChange(order.customerId, order.orderID, "rejected")
                        }
                        colorScheme="red"
                        w="50%"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {order.orderStatus === "inProgress" && (
                    <Button
                      onClick={() =>
                        handleStatusChange(order.customerId, order.orderID, "completed")
                      }
                      colorScheme="blue"
                      w="50%"
                    >
                      Complete
                    </Button>
                  )}
                </HStack>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </VStack>
    </Box>
  );
};

export default OrdersColumn;