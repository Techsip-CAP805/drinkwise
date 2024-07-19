
import React from "react";
import { useDrinkContext } from "../../../context/drinkContext";
import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import OrdersColumn from "../../components/OrdersColumn";

const IncomingOrders = () => {
  const { customers, setCustomers } = useDrinkContext();
  const toast = useToast();


  // Function to handle order status change
  const handleOrderStatusChange = (customerId, orderId, newStatus) => {
    // Calculate number of orders in inProgress status
    const inProgressOrdersCount = customers.reduce((count, user) => {
      return (
        count +
        user.orders.filter(order => order.orderStatus === "inProgress").length
      );
    }, 0);

    // Check if inProgressOrdersCount is already 5
    if (newStatus === "inProgress" && inProgressOrdersCount >= 5) {
      toast({
        description: "Cannot accept more than 5 orders in progress!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
      return; // Exit function without updating status
    }

    // Find the specific customer
    const updatedCustomers = customers.map((customer) => {
      if (customer._id.$oid === customerId) {
        // Find the specific order and update its status
        const updatedOrders = customer.orders.map((order) => {
          if (order.orderID === orderId) {
            return { ...order, orderStatus: newStatus };
          }
          return order;
        });

        // Return updated customer with updated orders
        return { ...customer, orders: updatedOrders };
      }
      return customer;
    });

    // Update the state with the modified customers array
    setCustomers(updatedCustomers);

    // Show appropriate toast message
    if (newStatus === "inProgress") {
      toast({
        description: "Order Accepted!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    } else if (newStatus === "rejected") {
      toast({
        description: "Order Rejected!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right"
      });
    }
  };

  // Calculate number of pending orders
  const pendingOrdersCount = customers.reduce((count, user) => {
    return (
      count +
      user.orders.filter((order) => order.orderStatus === "pending").length
    );
  }, 0);

  return (
    <Box bg="#bcc8c3" minHeight="100vh">
      <Box py={5} px={{ base: 4, md: 12 }}>
        <Heading color="white" textAlign="center" mt={20}>
          Incoming Orders ({pendingOrdersCount})
        </Heading>
        <SimpleGrid columns={1} mt={5} spacing={5}>
          {/* Display Incoming Orders */}
          <OrdersColumn
            orders={customers
              .filter((user) =>
                user.orders.some((order) => order.orderStatus === "pending")
              )
              .map((user) => ({
                ...user,
                orders: user.orders.filter(
                  (order) => order.orderStatus === "pending"
                ),
              }))}
            onStatusChange={handleOrderStatusChange}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default IncomingOrders;
